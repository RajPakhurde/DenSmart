import React, { useState, useEffect } from 'react';
import Zoom from '@mui/material/Zoom';

const DashboardDiv1 = () => {
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

    return (
        <Zoom in={true}>
            <div className='dashboard-div-1'>
                <div className='dashboard-div-item'>
                <div className="icon icon1">
                    <i class="ri-team-fill"></i>
                </div>
                <div>
                    <p>Total Reg Patients</p>
                    <h2>{dashboardData.regPatients}</h2>
                </div>
            </div>
            <div className='dashboard-div-item'>
                <div className='icon icon2'>
                    <i class="fa-solid fa-person"></i>
                </div>
                <div>
                    <p>Male Patients</p>
                    <h2>{dashboardData.malePatients}</h2>
                </div>
            </div>
            <div className='dashboard-div-item'>
                <div className='icon icon3'>
                    <i class="fa-solid fa-person-dress"></i>
                </div>
                <div>
                    <p>Female Patients</p>
                    <h2>{dashboardData.femalePatients}</h2>
                </div>
            </div>
            <div className='dashboard-div-item'>
                <div className='icon icon4'>
                    <i class="ri-team-fill"></i>
                </div>
                <div>
                    <p>Age 0-20 Patients</p>
                    <h2>{dashboardData.agePatients}</h2>
                </div>
            </div>
            </div>
        </Zoom>
    );
};

export default DashboardDiv1;
