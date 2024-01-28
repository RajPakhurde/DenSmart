import React from 'react';
import Zoom from '@mui/material/Zoom';

const DashboardDiv1 = () => {
    return (
        <Zoom in={true}>
            <div className='dashboard-div-1'>
                <div className='dashboard-div-item'>
                <div className="icon icon1">
                    <i class="ri-team-fill"></i>
                </div>
                <div>
                    <p>Total Reg Patients</p>
                    <h2>0</h2>
                </div>
            </div>
            <div className='dashboard-div-item'>
                <div className='icon icon2'>
                    <i class="fa-solid fa-person"></i>
                </div>
                <div>
                    <p>Male Patients</p>
                    <h2>0</h2>
                </div>
            </div>
            <div className='dashboard-div-item'>
                <div className='icon icon3'>
                    <i class="fa-solid fa-person-dress"></i>
                </div>
                <div>
                    <p>Female Patients</p>
                    <h2>0</h2>
                </div>
            </div>
            <div className='dashboard-div-item'>
                <div className='icon icon4'>
                    <i class="ri-team-fill"></i>
                </div>
                <div>
                    <p>Age 0-20 Patients</p>
                    <h2>0</h2>
                </div>
            </div>
            </div>
        </Zoom>
    );
};

export default DashboardDiv1;
