"use client"
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import WithAuth from '../../components/Layout/WithLayout';
import './style.css'
import useUserActivity from "../../hooks/useUserActivity";

ChartJS.register(ArcElement, Tooltip, Legend);

type Unit = {
    unit_id: string;
    unit_name: string;
    scores: number[];
};

type Subject = {
    subject_id: string;
    subject_name: string;
    units: Unit[];
};

type StudentData = {
    user_id: string;
    name: string;
    email: string;
    registration_date: string;
    subjects: Subject[];
};

// Mock data structure example (ensure this matches your actual data structure)
const studentData: StudentData = {
    user_id: 'unique_user_id_1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    registration_date: '2024-06-20',
    subjects: [
        {
            subject_id: 'subject_id_1',
            subject_name: 'Computing',
            units: [
                {
                    unit_id: 'unit_1',
                    unit_name: 'Introduction to Computing',
                    scores: [85, 90, 78],
                },
                {
                    unit_id: 'unit_2',
                    unit_name: 'Data Structures',
                    scores: [88, 92, 81],
                },
                {
                    unit_id: 'unit_3',
                    unit_name: 'Algorithms',
                    scores: [75, 80, 85],
                },
                {
                    unit_id: 'unit_4',
                    unit_name: 'Computer Networks',
                    scores: [90, 95, 92],
                },
                {
                    unit_id: 'unit_5',
                    unit_name: 'Operating Systems',
                    scores: [78, 85, 88],
                },
                {
                    unit_id: 'unit_6',
                    unit_name: 'Database Management',
                    scores: [82, 86, 89],
                },
                {
                    unit_id: 'unit_7',
                    unit_name: 'Software Engineering',
                    scores: [84, 88, 90],
                },
                {
                    unit_id: 'unit_8',
                    unit_name: 'Artificial Intelligence',
                    scores: [87, 90, 85],
                },
                {
                    unit_id: 'unit_9',
                    unit_name: 'Machine Learning',
                    scores: [85, 89, 90],
                },
                {
                    unit_id: 'unit_10',
                    unit_name: 'Cybersecurity',
                    scores: [88, 91, 87],
                },
            ],
        },
    ],
};

const createDoughnutChartData = (unitName: string, avgScore: number) => ({
    labels: [],
    datasets: [
        {
            label: `${unitName} Score`,
            data: [avgScore, 100 - avgScore],
            backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
            borderWidth: 1,
        },
    ],
});

const calculateAverage = (scores: number[]) => {
    const total = scores.reduce((sum, score) => sum + score, 0);
    return total / scores.length;
};

const LineChart: React.FC = () => {
    const data = studentData;
    useUserActivity();
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', padding: '20px', color: '#f9f9f9' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: '20px' }}>
                {data.subjects.map((subject) => (
                    <div key={subject.subject_id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #ccc', padding: '20px', borderRadius: '8px', width: '90%', backgroundColor: '#f9f9f9', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        {/* <h2>Unit Analysis</h2> */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', width: '100%' }}>
                            {subject.units.map((unit) => {
                                const avgScore = calculateAverage(unit.scores);
                                return (
                                    <div key={unit.unit_id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10px' }}>
                                        <div style={{ position: 'relative', width: '150px', height: '150px' }}>
                                            <Doughnut
                                                data={createDoughnutChartData(unit.unit_name, avgScore)}
                                                options={{ plugins: { legend: { display: false } } }}
                                            />
                                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '14px', fontWeight: 'bold', pointerEvents: 'none', color: '#00008b' }}>{`${avgScore.toFixed(1)}%`}</div>
                                        </div>
                                        <h3 style={{ marginBottom: '5px', fontSize: '16px', color: '#666', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '180px', textAlign: 'center' }}>{unit.unit_name}</h3>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WithAuth(LineChart);
