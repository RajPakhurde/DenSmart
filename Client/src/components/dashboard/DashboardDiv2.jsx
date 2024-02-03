import React, { useState, useEffect } from 'react';
import DashboardSmallTable from './DashboardSmallTable';
import Zoom from '@mui/material/Zoom';

const DashboardDiv2 = () => {
    const tableHeadings = [
        'New Registered Patients',
        'Appointments',
        'Visisted Patients',
        'Treatments Done'
    ];

    const icons = [
        <i class="ri-team-fill"></i>,
        <i class="ri-calendar-2-line"></i>,
        <i class="ri-team-fill"></i>,
        <i class="ri-thumb-up-fill"></i>
    ]

    const [dashboardData, setDashboardData] = useState([]);

    const  getDashboardData = async () => {
        try {
            const response = await fetch("http://localhost:8080/dashboard");
            const jsonData = await response.json();
            setDashboardData(jsonData);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getDashboardData();
    },[])
 
    console.log(dashboardData);

    return (
        <Zoom in={true}>
            <div className='dashboard-div-2'>
                {tableHeadings.map((th, index) => {
                    let Today = "Today" + index;
                    let ThisMonth = "ThisMonth" + index;
                    let LastMonth = "LastMonth" + index;
                    let ThisYear = "ThisYear" + index;
                    let LastYear = "LastYear" + index;

                    return <DashboardSmallTable key={index} id={index} th={th} icon={icons[index]} today={dashboardData[Today]} thisMonth={dashboardData[ThisMonth]} lastMonth={dashboardData[LastMonth]} thisYear={dashboardData[ThisYear]} lastYear={dashboardData[LastYear]} />
                })}
            
            </div>
        </Zoom>
    );
};

export default DashboardDiv2;