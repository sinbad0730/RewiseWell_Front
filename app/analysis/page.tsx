"use client"
import React from 'react';
import useUserActivity from "../../hooks/useUserActivity";

import WithAuth from '../../components/Layout/WithLayout';
import './style.css'
import { Empty } from 'antd';
const LineChart: React.FC = () => {
    useUserActivity();
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', padding: '20px' }}>
            <Empty/>
        </div>
    );
};

export default WithAuth(LineChart);
