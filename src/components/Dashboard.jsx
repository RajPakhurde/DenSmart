import React from 'react';
import DashboardDiv1 from './dashboard/DashboardDiv1';
import DashboardDiv2 from './dashboard/DashboardDiv2';


const Dashboard = () => {
    return (
        <div className='dashboard-container'>
            <DashboardDiv1 />
            <DashboardDiv2 />
        </div>
    );
};

export default Dashboard;