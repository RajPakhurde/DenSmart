import React, { useState } from 'react';
import AppointmentNav from './appointement/AppointmentNav';
import AppointmentAllTable from './appointement/AppointmentAllTable';
import AppointmentNewTable from './appointement/AppointmentNewTable';
import AppointmentCheckinTable from './appointement/AppointmentCheckinTable';
import AppointmentCancelTable from './appointement/AppointmentCancelTable';
import AppointmentCompleteTable from './appointement/AppointmentCompleteTable';

const Appointment = () => {
    const [currentTable, setCurrentTable] = useState("all");

    return (
        <div className='appointment-container'>
            <AppointmentNav setCurrentTable={setCurrentTable}/>

            {currentTable === "all" && <AppointmentAllTable/>}
            {currentTable === "new" && <AppointmentNewTable/>}
            {currentTable === "checkin" && <AppointmentCheckinTable/>}
            {currentTable === "cancel" && <AppointmentCancelTable/>}
            {currentTable === "completed" && <AppointmentCompleteTable/>}
             
        </div>
    );
};

export default Appointment; 