import React, { useState, useEffect } from 'react';
import { Zoom } from '@mui/material';

const AppointmentAllTable = () => {
    const [allAppointment, setAllAppointment] = useState([]);

     // Get all Appointment Records
     const getAllAppointment = async () => {
        try {
            const response = await fetch("http://localhost:8080/appointment ");
            const jsonDate = await response.json();

            setAllAppointment(jsonDate);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getAllAppointment();
    }, []);

    return (
        <Zoom in={true} >
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
                        <th class="table-header" id="controls">Controls</th>
                    </tr>
                </thead>
                <tbody>
                    {allAppointment.map((appointment) => {
                        return <tr>
                                    <td>{appointment.appointment_id}</td>
                                    <td>{appointment.patient_name}</td>
                                    <td>{appointment.app_date.split('T')[0]}</td>
                                    <td>{appointment.treatment}</td>
                                    <td>{appointment.doctor_name}</td>
                                    <td>{appointment.in_time}</td>
                                    <td>{appointment.out_time}</td>
                                    <td>{appointment.status}</td>
                                    <td>
                                        <i class="fa-solid fa-pencil"></i>
                                        <i class="fa-solid fa-trash"></i>
                                    </td> 
                                </tr>
                    })}
                </tbody>
                 
            </table> 
        </div>
        </Zoom>
    );
};

export default AppointmentAllTable;