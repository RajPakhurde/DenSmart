import React, { useState, useEffect } from 'react';
import { Zoom } from '@mui/material';

const AppointmentCancelTable = () => {
    const [cancelAppointment, setCancelAppointment] = useState([]);

    // Get cancel Appointment Records
    const getCancelAppointment = async () => {
       try {
           const response = await fetch("http://localhost:8080/cancel ");
           const jsonDate = await response.json();

           setCancelAppointment(jsonDate);
       } catch (error) {
           console.log(error.message);
       }
   }

   useEffect(() => {
    getCancelAppointment();
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
                    {cancelAppointment.map((appointment) => {
                        const formattedDate = new Date(appointment.app_date).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

                        return <tr>
                                    <td>{sNo++}</td>
                                    <td>{appointment.patient_name}</td>
                                    <td>{formattedDate.split(',')[0]}</td>
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

export default AppointmentCancelTable;