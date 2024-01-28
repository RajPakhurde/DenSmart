import React from 'react';
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


    return (
        <Zoom in={true}>
            <div className='dashboard-div-2'>
                {tableHeadings.map((th, index) => {
                    return <DashboardSmallTable key={index} id={index} th={th} icon={icons[index]} />
                })}
            
            </div>
        </Zoom>
    );
};

export default DashboardDiv2;