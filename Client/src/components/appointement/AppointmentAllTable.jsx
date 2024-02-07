import React, { useState, useEffect } from 'react';
import { Zoom } from '@mui/material';

const AppointmentAllTable = () => {
    const [allAppointment, setAllAppointment] = useState([]);
    let sNo = 1;

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

  
    const handleClick = async (id) => {
        try {
            const deleteapp = await fetch("http://localhost:8080/appointment/"+id, {
                method: "DELETE"
            });

            getAllAppointment();
        } catch (error) {
            console.log(error.message);
        } 
    }

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
                                    <td className='app-delete-btn'
                                    onClick={() =>{
                                        if(!window.confirm("Are you sure?")) return
                                        handleClick(appointment.appointment_id)
                                    }
                                    }
                                    >
                                        {/* <i class="fa-solid fa-pencil"></i> */}
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