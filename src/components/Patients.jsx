import React, { useState } from 'react';
import PatientsTable from './patients/PatientsTable';
import AddPatient from './patients/AddPatient';

const Patients = () => {
    const [currentTable, setCurrentTable] = useState("patient-table");


    return (
        <div className='patients-container'>

            {currentTable === "patient-table" && <PatientsTable setCurrentTable={setCurrentTable} />}
            {currentTable === "add-new-patient" && <AddPatient setCurrentTable={setCurrentTable} />}
             
        </div>
    );
};

export default Patients;