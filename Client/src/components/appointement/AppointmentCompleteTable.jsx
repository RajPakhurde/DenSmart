import React, { useState, useEffect } from 'react';
import { Zoom } from '@mui/material';

const AppointmentCompleteTable = () => {
    const [completedAppointment, setCompletedAppointment] = useState([]);

    // Get all Appointment Records
    const getCompletedAppointment = async () => {
       try {
           const response = await fetch("http://localhost:8080/completed ");
           const jsonDate = await response.json();

           setCompletedAppointment(jsonDate);
       } catch (error) {
           console.log(error.message);
       }
   }

   useEffect(() => {
    getCompletedAppointment();
   }, []);

   let sNo = 1;

    return (
        <Zoom in={true}>
        <div className='appointment-tables '>
        <table class="table">
                <thead>
                    <tr> 
                        <th class="table-header" id="sno">SNo</th>
                        <th class="table-header" id="patient-name">Patient Name</th>
                        <th class="table-header" id="date">Date</th>
                        <th class="table-header" id="treatment">Treatment</th>
                        <th class="table-header" id="doctors">Doctors</th>
                        <th class="table-header" id="intime">In Time</th>
                        <th class="table-header" id="outtime">Out Time</th>
                        <th class="table-header" id="status">Status</th>
                        {/* <th class="table-header" id="controls">Controls</th> */}
                    </tr>
                </thead>
                <tbody>
                    {completedAppointment.map((appointment) => {
                        return <tr>
                                    <td>{sNo++}</td>
                                    <td>{appointment.patient_name}</td>
                                    <td>{appointment.app_date.split('T')[0]}</td>
                                    <td>{appointment.treatment}</td>
                                    <td>{appointment.doctor_name}</td>
                                    <td>{appointment.in_time}</td>
                                    <td>{appointment.out_time}</td>
                                    <td>{appointment.status}</td>
                                    {/* <td className='controls'>
                                        <i class="fa-solid fa-xmark"></i>
                                        <i class="fa-solid fa-check"></i>
                                    </td>  */}
                                </tr>
                    })}
                </tbody>
                 
            </table> 
        </div>
        </Zoom>
    );
};

export default AppointmentCompleteTable;