import React from 'react';
import DashboardDiv1 from './dashboard/DashboardDiv1';
import DashboardDiv2 from './dashboard/DashboardDiv2';
import DashboardDiv3 from './dashboard/DashboardDiv3';

const Dashboard = () => {
    return (
        <div className='dashboard-container'>
            <DashboardDiv1 />
            <DashboardDiv2 />
            <DashboardDiv3 />
        </div>
    );
};

export default Dashboard;