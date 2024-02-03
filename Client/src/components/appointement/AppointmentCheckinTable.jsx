import React, { useState, useEffect} from 'react';
import { Zoom, snackbarClasses } from '@mui/material';

const AppointmentCheckinTable = () => {
    const [checkinAppointment, setCheckinAppointment] = useState([]);

    // Get all Appointment Records
    const getCheckinAppointment = async () => {
       try {
           const response = await fetch("http://localhost:8080/checkin ");
           const jsonDate = await response.json();

           setCheckinAppointment(jsonDate);
       } catch (error) {
           console.log(error.message);
       }
   }

   useEffect(() => {
    getCheckinAppointment();
   }, []);

   // Update status
   const updateStatus = async (e, status) => { 
        try {
            // console.log(e.target.id, status);
            const body = {status};
            const id = e.target.id;
            const response = await fetch("http://localhost:8080/appointment/"+id, {
                method: "PUT",
                headers: {"content-type": "application/json"},
                body: JSON.stringify(body)
            }) 

            getCheckinAppointment();
        
            alert("Status updated");
          
        } catch (error) {
            console.log(error.message);
        }
    }

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
                        <th class="table-header" id="controls">Controls</th>
                    </tr>
                </thead>
                <tbody>
                    {checkinAppointment.map((appointment) => {
                        return <tr>
                                    <td>{sNo++}</td>
                                    <td>{appointment.patient_name}</td>
                                    <td>{appointment.app_date.split('T')[0]}</td>
                                    <td>{appointment.treatment}</td>
                                    <td>{appointment.doctor_name}</td>
                                    <td>{appointment.in_time}</td>
                                    <td>{appointment.out_time}</td>
                                    <td>{appointment.status}</td>
                                    <td className='controls'>
                                        <i class="fa-solid fa-xmark" id={appointment.patient_id}
                                        onClick={(e) => {
                                             updateStatus(e, "cancel");
                                        }}
                                        ></i>
                                        <i class="fa-solid fa-check" id={appointment.patient_id}
                                        onClick={(e) => {
                                            updateStatus(e, "completed");
                                        }}
                                        ></i>
                                    </td> 
                                </tr>
                    })}
                </tbody>
                 
            </table> 
        </div>
        </Zoom>
    );
};

export default AppointmentCheckinTable;