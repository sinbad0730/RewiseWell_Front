import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from "@/utils/axios";
import type { SelectProps } from 'antd';
import { Select } from 'antd';
import dynamic from 'next/dynamic';
import { ConfigProvider, theme } from 'antd';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false
});

interface ProgressChartProps {
  student: number | null;
  subject: number;
  className: string | null;
}

interface ItemProps {
  label: string;
  value: string;
}


const ProgressChart: React.FC<any> = ({ student, subject, className }) => {
  const [options, setOptions] = useState<any>({
    chart: {
      type: 'line' as const,
      height: 850,
      background: '#334155',
      foreColor: '#fff',
      animations: {
        enabled: true
      },
      padding: {
        left: 100,
        right: 100,
        top: 100,
        bottom: 100
      }
    },
    borderRadius: 12,
    stroke: {
      curve: 'smooth' as const
    },
    xaxis: {
      categories: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan 2024', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      title: {
        text: 'Month'
      }
    },
    yaxis: {
      title: {
        text: 'Progress Score'
      },
      min: 0,
      max: 100,
      labels: {
        formatter: (value: number) => `${Math.round(value)}%` // Round to the nearest integer
      }
    },
    margin: {
      left: 100,
      right: 100,
      top: 100,
      bottom: 100
    },
  })
  const token = JSON.parse(localStorage.getItem('authtoken') as string).access_token
  const [score, setScore]: any = useState([])
  const [units, setUnits]: any = useState([])
  const [chart, setChart] = useState<string[]>([])
  const [chartTemp, setChartTemp] = useState<any>(null)
  const [activeUnits, setActiveUnits] = useState<boolean[]>([])
  const [unitData, setUnitData] = useState<ItemProps[]>([])
  const [value, setValue] = useState<string[]>([]);

  useEffect(() => {
    if (className && subject) {
      getScoreByClass(className, subject)
    }
  }, [className, subject])

  useEffect(() => {
    if (student && subject) {
      getScore()
    }
  }, [student, subject])

  useEffect(() => {
    if (subject) {
      getUnits(subject)
      setValue([])
    }
  }, [subject])

  useEffect(() => {
    if (units && subject && score || student || className) {
      const chartData: any[] = []
      let weeklyData = Array(11).fill(0);
      const earliestDate = new Date(Math.min(...score.map((s: any) => new Date(s.created_at).getTime())));
      units.forEach((unit: any) => {
        const weeklyScores: { [key: number]: number[] } = {};

        score.forEach((s: any) => {
          if (s.unit_id === parseInt(unit.unit_id)) {
            const itemDate = new Date(s.created_at)
            let monthIndex = itemDate.getMonth() - 7;
            if (monthIndex < 0) monthIndex += 12;

            if (!weeklyScores[monthIndex]) {
              weeklyScores[monthIndex] = [];
            }
            weeklyScores[monthIndex].push(s.score);
          }
        })


        const weeklyAverages = Object.entries(weeklyScores).map(([week, scores]) => ({
          week: parseInt(week),
          average: scores.reduce((sum, score) => sum + score, 0) / scores.length, // This can result in a float
          numberOfScores: scores.length
        }));

        Object.entries(weeklyAverages).forEach(([week, scores]: any) => {
          weeklyData[scores.week] = scores.average;
        })
        chartData.push({
          name: `Unit ${unit.unit_id}: ${unit.unit_name}`,
          data: [...weeklyData],
          borderColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`,
        })
        weeklyData = Array(11).fill(0);
      })

      setActiveUnits(chartData.map(() => true));
      setChartTemp(chartData)
    }
  }, [units, student, subject, score]);

  useEffect(() => {
    if (chartTemp && value) {
      // Filters data based on the unit's `unit_id`
      const datasets = chartTemp
        .filter((chartData: any) => {
          const unitId = chartData.name.match(/Unit (\d+)/); // Extract the unit_id from the string "Unit <unit_id>"
          return unitId && value.includes(unitId[1]); // Compare the extracted unit_id with the selected value
        })
        .map((chartData: any) => ({
          name: chartData.name,
          data: chartData.data,
        }));
  
      console.log('Filtered chart data:', datasets);  // Check if the filtered data is correct
      setChart(datasets);  // Update the chart with the filtered data
    }
  }, [chartTemp, value]);
  
  

  useEffect(() => {
    const temp_activeUnits = units.map((unit: any) => ({
      value: unit.unit_id.toString(),
      label: unit.unit_name,
    }));
    setUnitData(temp_activeUnits);

    units.length > 0 && units?.map((unit: any, index: number) => {
      temp_activeUnits[index] = {
        value: unit.unit_id.toString(),
        label: unit.unit_name
      }
    })
    setUnitData(temp_activeUnits)
  }, [units])

  const getScore = async () => {
    await axios.get(`${API_BASE_URL}/exam/get_exam_score/${student}/${subject}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }).then((res) => {
      setScore(res.data)
    })
  }


  const getUnits = async (id: number) => {
    await axios.get(`${API_BASE_URL}/grade-retrieval/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => {
        setUnits(res.data);
      })
  }

  const getScoreByClass = async (className: string, subject: number) => {
    await axios.get(`${API_BASE_URL}/exam/get_exam_score_by_class/${className}/${subject}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }).then((res) => {
      setScore(res.data)
    })
  }

  const sharedProps: SelectProps = {

    value,
    onChange: (newValue) => {
      console.log("Units selected:", newValue);  // Check the selection here
      setValue(newValue);
    },
    mode: 'multiple',
    style: { width: '100%' },
    options: unitData,
    placeholder: 'Select Unit',
    maxTagCount: 'responsive',
  };

  const selectProps: SelectProps = {
    value,
    onChange: setValue,
  };

  useEffect(() => {
    console.log("Units updated:", units);
  }, [units]);

  console.log('chartTemp:', chartTemp);
  console.log('Selected units:', value);
  console.log('Filtered chart data:', chart);


  return (
    <div className='flex justify-center items-center flex-col mt-5'>
      <div className='w-full'>

        {units.length > 0 &&
          <div className="rounded-md shadow-md dark:bg-slate-700 dark:text-white py-4 px-7 flex justify-center items-center ">
            <ConfigProvider
              theme={{
                algorithm: theme.darkAlgorithm,
                token: {
                  colorBgContainer: '#334155',      // Background color
                  colorBgElevated: '#334155',      // Dropdown background
                  colorBorder: '#fff',          // Border color
                  colorPrimary: '#fff',         // Primary color (for selected items)
                  colorText: 'rgb(255, 255, 255)',  // Text color
                  colorTextSecondary: 'rgba(255, 255, 255, 0.45)',  // Secondary text
                  controlItemBgHover: 'rgb(153, 200, 255)',   // Hover state background
                  controlItemBgActive: '#177ddc15',  // Active/selected state background
                  colorBgTextHover: '#000',
                  controlOutline: 'transparent',    // Removes the focus outline
                  colorPrimaryHover: '#fff',
                }
              }}
            >
              <Select
                {...sharedProps}
                {...selectProps}
              />
            </ConfigProvider>
          </div>
        }
      </div>
      {units.length > 0 && 
        <div className='w-full mt-10 p-5 bg-slate-700 rounded-md'>
          <ReactApexChart
            type="line"
            height={400}
            series={chart as any}  // Make sure 'chart' contains the filtered data
            options={options}
          />
        </div>
      }
    </div>
  );
};

export default ProgressChart;
