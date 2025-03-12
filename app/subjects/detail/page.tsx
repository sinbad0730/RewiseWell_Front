"use client";
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import WithAuth from '@/components/Layout/WithLayout';
import axios from 'axios';
import { API_BASE_URL } from '@/utils/axios';
import { Modal, Alert } from 'antd';
import StyledContainer from './StyleContainer';

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });


interface Unit {
  unit_id: string;
  unit_name: string;
  scores: string[];
  user_id: string;
}


// const getBarColor = (value: number) => {
//   if (value === 0) return '#cccccc';
//   if (value < 50) return '#ff6666';
//   if (value >= 50 && value <= 79) return '#ffcc66';
//   return '#66ff66';
// };



const initialOptionsVerticalChart: any = {
  chart: {
    type: 'bar',
    fontFamily: "'Plus Jakarta Sans', sans-serif;",
    // background: 'rgba(30, 58, 138, 3)',
    foreColor: '#C9F2DF',
    toolbar: {
      show: false,
    },
    height: 500,
    dropShadow: {
      enabled: true,
      top: 2,
      left: 2,
      blur: 3,
      right: 4,
      opacity: 0.3,
    },
  },
  colors: ['#03A678'],
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: '60%',
      columnWidth: '45%',
      borderRadius: [10],
      borderRadiusApplication: 'end',
      borderRadiusWhenStacked: 'all',
      distributed: true, 
      padding: {
        left: 200,
      },
    },
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      type: 'vertical',
      shadeIntensity: 0.5,
      // removed gradient fade on first chart bar here
      gradientToColors: ['#48D97A'],
      inverseColors: false,
      opacityFrom: 6,
      opacityTo: 0.7,
      stops: [0, 100],
    },
  },
  
  stroke: {
    show: false,
    width: 10,
    lineCap: "butt",
    colors: ["transparent"],
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    show: false,
  },
  grid: {
    borderColor: 'rgba(0,0,0,0.1)',
    strokeDashArray: 3,
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  yaxis: {
    categories: [],
    labels: {
      borderColor: '#48D97A',
      show: true,
      align: 'left',
      style: {
        fontSize: '14px',
        fontWeight: 800,
        color: '#48D97A',
      },
    },
    axisBorder: {
      show: true,
      color: '#48D97A',
      width: 1,
    },
  },
  xaxis: {
    borderColor: '#48D97A',
    tickAmount: 4,
    forceNiceScale: false,
    labels: {
      formatter: (value: number) => `${Math.floor(value)}%`,
      style: {
        fontSize: '12px',
        fontWeight: 400,
        
      },
    },
    axisBorder: {
      show: true,
      color: '#48D97A',
      height: 10,
    },
  },
  tooltip: {
    theme: 'dark',
    fillSeriesColor: false,
    y: {
      formatter: (value: number) => `${Math.round(value)}%`,
    },
  },
  series: [
    {
      name: "Example",
      data: [20, 50, 80],
    },
  ],
};



const initialSeriesVerticalChart: any = [
  {
    name: 'Average Score',
    data: [],
  },
];

const SubjectDetailPage: React.FC = () => {
  const [units, setUnits] = useState<Unit[]>([]);
  const [scores, setScores] = useState<any[]>([]);
  const [student, setStudent] = useState<any>({});
  const [examScore, setExamScore] = useState<any[]>([]);
  const [optionsVerticalChart, setOptionsVerticalChart] = useState<any>(initialOptionsVerticalChart);
  const [seriesVerticalChart, setSeriesVerticalChart] = useState<any>(initialSeriesVerticalChart);
  const [showHelp, setShowHelp] = useState(false);
  const [maxIndex, setMaxIndex] = useState(0);
  const [minIndex, setMinIndex] = useState(0);
  const searchParams = useSearchParams();
  const subjectId = parseInt(searchParams?.get('subject_id') || '0');
  const userInfo = JSON.parse(localStorage.getItem('authtoken') as string).user
  const token = JSON.parse(localStorage.getItem('authtoken') as string).access_token

  useEffect(() => {
    setStudent(userInfo)
  }, [])
  useEffect(() => {
    if (optionsVerticalChart.xaxis.categories?.length > 0) {
      getExamScore(subjectId);
    }
  }, [subjectId, optionsVerticalChart.xaxis.categories]);
  

  useEffect(() => {
    const loadUnitsAndScores = async () => {
      try {
        const unitNames = await fetchUnitsNames(subjectId);
        setUnits(unitNames);
        setOptionsVerticalChart((prevState: any) => ({
          ...prevState,
          xaxis: { categories: unitNames.map((unit: any) => unit.unit_name) },
        }));
      } catch (error) {
        console.error('Error loading units and scores:', error);
      }
    };
  
    if (subjectId) {
      loadUnitsAndScores();
    }
  }, [subjectId]);
  

  useEffect(() => {
    if (examScore.length > 0) {
      // const colors = examScore.map((score: number) => getBarColor(score));
      // console.log(colors);
      
      setOptionsVerticalChart((prevState: any) => ({
        ...prevState,
        // colors: colors,
        xaxis: {
          ...prevState.xaxis,
          min: 0,
          max: 100,
        },
      }));
    }
  }, [examScore]);

  const getLastThreeScores = (scores: any[]) => {

    if (typeof scores[0] === 'number') {
      return scores.slice(-3);
    }
    
    return scores
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3);
  };
  
  const getExamScore = async (subjectId: number) => {
    try {
      await axios.get(`${API_BASE_URL}/exam/get_exam_score/${userInfo.id}/${subjectId}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      }).then((res) => {
        const data = res.data.map((item: any) => {
          if (item.subject_id === subjectId && item.student_id === userInfo.id) {
            return item
          }
        })

        const scores = units.map((unit: any) => {
          let score: any[] = []
          data.map((item: any) => {
            if (unit.unit_id == item.unit_id) {
              score.push(item.score)
            }
          })
          return score
        })
        
        const scoreData = scores?.map((item: any) => {
          if (item?.length > 0) {
            const lastThreeScores = getLastThreeScores(item);
            const averageScore = lastThreeScores.reduce((acc: number, score: number) => acc + score, 0) / lastThreeScores.length || 0;
            return averageScore;
          } else {
            return 0;
          }
        });
        
        
        setExamScore(scoreData);

        const minIndex = scoreData.reduce((minIndex, current, index, array) => {
          if (current !== 0 && current < array[minIndex]) {
            return index;
          } else {
            return minIndex;
          }
        }, 0);
        setMinIndex(minIndex);

        const maxIndex = scoreData.reduce((maxIndex, current, index, array) => {
          if (current !== 0 && current > array[maxIndex]) {
            return index;
          } else {
            return maxIndex;
          }
        }, 0);

        setMaxIndex(maxIndex);
        
        setSeriesVerticalChart((prevState: any) => [
          {
            ...prevState[0],
            data: scoreData
          }
        ]);

      })
    } catch (error) {
      console.error('Error fetching exam scores:', error);
    }
  }

  const getAuthToken = () => {
    if (typeof window === 'undefined') {
      return null;
    }
    const authToken = localStorage.getItem('authtoken');
    return authToken ? JSON.parse(authToken) : null;
  };

  const fetchUnitsNames = async (subject_id: number) => {
    const authToken = getAuthToken();
    if (!authToken) {
      throw new Error('No authentication token found');
    }
  
    const token = authToken.access_token;
  
    try {
      const response = await axios.get(`${API_BASE_URL}/grade-retrieval/${subject_id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching units:', error);
      throw error;
    }
  };


  return (
    <div className="min-h-screen flex w-full justify-center flex-col bg-background">
      <Modal open={showHelp} onCancel={() => setShowHelp(false)} footer={null}>
        <div className="tutorial-overlay rounded-md p-5">
          <div className="tutorial-content space-y-2">
          <h2 className='text-xl text-center'>
            Units Performance Dashboard
          </h2>
          <iframe
              className='w-full h-[315px]'
              src="https://www.youtube.com/embed/2P2_rmJc-bE"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen>
            </iframe>
            <div className='flex justify-end'>
              <button id="help" className='py-2 px-4 dark:bg-blue-700 dark:text-white' onClick={() => setShowHelp(false)}>Got It!</button>
            </div>
          </div>
        </div>
      </Modal>
      <div className='flex justify-center items-center '>
        <h1 className='text-3xl font-bold text-center mb-2 mt-10' style={{ color: '#03A678' }}>Units Performance Dashboard</h1>
        {/* <button id='help' className="ml-2 px-[10px] rounded-full text-lg dark:bg-blue-700 dark:text-white" onClick={() => setShowHelp(true)}>?</button> */}
      </div>
     
      <div className="w-full space-y-6">
        <div className="rounded-md  dark:bg-darkgray p-6">
          <StyledContainer>
            {seriesVerticalChart[0].data.length > 0 && (
              <Chart
                options={optionsVerticalChart}
                series={seriesVerticalChart}
                type="bar"
                height={500}
                width="100%"
              />
            )}
          </StyledContainer>
        </div>
      </div>
    </div>
  );
};


export default WithAuth(SubjectDetailPage);