"use client";
import React from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface UnitComponentProps {
    unit_name: any;
    scores: number[];
}

const UnitComponent: React.FC<UnitComponentProps> = ({ unit_name, scores }: UnitComponentProps) => {
    const latestScores = scores?.length > 2 ?scores.slice(-3) : scores;

    const getColor = (score: number) => {
        if (score > 60) return "var(--color-success)"; // Green for scores above 90
        if (score > 50) return "var(--color-warning)"; // Yellow for scores above 70
        return "var(--color-error)";// Red for scores 70 and below
    };

    const average = (arr: any[]) => {
        if(!arr) return 0;
        if (arr?.length === 0) return 0;
        const sum = arr?.reduce((acc, current) => Number(acc) + Number(current), 0);
        return Math.ceil(sum / arr?.length);
    };

    const avgScore = average(latestScores);

    const ChartData: any = {
        series: [avgScore], 
        chart: {
            fontFamily: "inherit",
            type: 'radialBar',
            height: '100%',
            offsetY: -20,

            sparkline: {
                enabled: true,
            },

            toolbar: {
                show: false,
            },

            animations: {
                enable: false,
            },
            events: {
                click: (event: { preventDefault: () => any; }) => event.preventDefault(),
            },
            interactive: false,

            
            selection: {
                enable: false,
            },

            background: 'grey11',
            // dropShadow: {
            //     enabled: true,
            //     enabledOnSeries: undefined,
            //     top: 3,
            //     left: 0,
            //     blur: 1,
            //     color: 'grey11',
            //     opacity: 0.35
            // }
        },
        
        plotOptions: {
            radialBar: {
                startAngle: -90,
                endAngle: 90,
                track: {
                    background: "var(--color-light)",
                    strokeWidth: '97%',
                    margin: 5,
                    show: true,
                    opacity: 1,
                    dropShadow: {
                        enable: true,
                        top: 2,
                        left: 0,
                        blur: 4,
                        opacity: 0.15,
                    },

                },
                dataLabels: {
                    name: {
                        show: false,
                        fontSize: '16px',
                    },
                    value: {
                        show: true,
                        offsetY: -2,
                        fontSize: '22px',
                        formatter: function(val: number) {
                            return val + "%";
                        }
                    }
                }
            },
        },

        fill: {
            colors: [getColor(avgScore)],
            
        },

        labels: ['Average Score'],

        grid: {
            borderColor: '#e0e0e0',
            strokeDashArray: 5,
        },

        xaxis: {
            lines: {
                show: true,
            },
        },
        yaxis: {
            lines: {
                show: true,
            },
        },
        stroke: {
            lineCap: "round",
            colors: ["transparent"],
        },
        title: {
            style: {
                color: 'red'
            }
        }
    };

    return (
        <>
            <div className="chart-container bg-lightsecondary rounded-lg p-6 relative w-full break-words" style={{ userSelect: 'none' }}>
                <div className="flex items-center justify-between" style={{ height: '40px', width: '100%' }}>
                    <div className="flex items-center gap-3 flex-grow">
                        <h5 className="opacity-75 truncate w-full dark:text-white text-md" style={{ maxWidth: '100%' }}>
                            {unit_name}
                        </h5>
                    </div>
                </div>

                <div className="grid grid-cols-12 items-end mt-2">
                    <div className="xl:col-span-1 col-span-12">
                        <div className="chart-container" style={{ height: '250px', width: '100%' }}>
                            <Chart
                                options={ChartData}
                                series={ChartData.series}
                                type="radialBar"
                                height="85%"
                                width="100%"
                                titleStyle={{ color: 'red' }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .truncate {
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            `}</style>
        </>
    );
};

export default UnitComponent;


// "use client";
// import React from "react";
// import dynamic from "next/dynamic";
// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
// import { Icon } from "@iconify/react";
// import { Dropdown } from "flowbite-react";
// import { HiOutlineDotsVertical } from "react-icons/hi";

// interface UnitComponentProps {
//     unit_name: any;
//     scores: number[]; // Assuming scores should be numbers
// }

// const UnitComponent: React.FC<UnitComponentProps> = ({ unit_name, scores }: UnitComponentProps) => {
 
//     const getColor = (score: number) => {
//         // console.log('Score', score)
//         if (score > 90) return "var(--color-success)"; // Green for scores above 90
//         if (score > 70) return "var(--color-warning)"; // Yellow for scores above 70
//         return "var(--color-error)";// Red for scores 70 and below
//     };
//     const latestScores = scores.slice(-3);
//     // Generate colors array based on scores
//     const colors = scores.map(score => getColor(score));
//     console.log(colors)
//     const ChartData: any = {
//         series: [
//             {
//                 name: "Scores",
//                 data: latestScores, // Use the `scores` prop here
//             },
//         ],
//         chart: {
//             fontFamily: "inherit",
//             type: "bar",
//             height: 100,
//             stacked: true,
//             toolbar: {
//                 show: false,
//             },
//             sparkline: {
//                 enabled: true,
//             },
//         },
//         grid: {
//             show: false,
//             borderColor: "rgba(0,0,0,0.1)",
//             strokeDashArray: 1,
//             xaxis: {
//                 lines: {
//                     show: false,
//                 },
//             },
//             yaxis: {
//                 lines: {
//                     show: true,
//                 },
//             },
//             padding: {
//                 top: 0,
//                 right: 0,
//                 bottom: 0,
//                 left: 0,
//             },
//         },
//         colors: colors,
//         plotOptions: {
//             bar: {
//                 horizontal: false,
//                 columnWidth: "30%",
//                 borderRadius: [5],
//                 borderRadiusApplication: "end",
//                 borderRadiusWhenStacked: "all",
//             },
//         },
//         dataLabels: {
//             enabled: false,
//         },
//         xaxis: {
//             labels: {
//                 show: false,
//             },
//             axisBorder: {
//                 show: false,
//             },
//             axisTicks: {
//                 show: false,
//             },
//         },
//         yaxis: {
//             labels: {
//                 show: false,
//             },
//         },
//         tooltip: {
//             theme: "dark",
//         },
        
//         legend: {
//             show: false,
//         },
//     };

//     const average = (arr: any[]) => {
//         // Convert the array of strings to an array of numbers
//         const numbers = arr.map(Number);       

//         // Check if the resulting array is empty
//         if (numbers.length === 0) return 0;

//         // Calculate the sum of the numbers
//         const sum = numbers.reduce((acc, current) => acc + current, 0);

//         // Return the average
//         return (sum / numbers.length).toFixed(0);
//     }    
//     return (
//         <>
//             <div className="bg-lightsecondary rounded-lg p-6 relative w-full break-words">
//                 <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                         <h5 className="text-base opacity-70">{unit_name}</h5>
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-12 gap-[24px] items-end mt-10">
//                     <div className="xl:col-span-3 col-span-3">
//                         <h2 className="text-3xl">{average(latestScores)}</h2>
//                     </div>
//                     <div className="xl:col-span-12  col-span-7 ">
//                         <div className="rounded-bars">
//                             <Chart
//                                 options={ChartData}
//                                 series={ChartData.series}
//                                 type="bar"
//                                 height='70px'
//                                 width='50%'
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default UnitComponent;
