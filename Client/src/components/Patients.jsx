import React, { useState } from 'react';
import PatientsTable from './patients/PatientsTable';
import AddPatient from './patients/AddPatient';
import PatientInfo from './patients/PatientInfo';
import AppointmentAddNew from './appointement/AppointmentAddNew';
import LabRecords from './records/forms/LabRecord';
import ConsumeMaterial from './records/forms/ConsumeMaterial';
import ConsultingFee from './records/forms/ConsultingFee';

const Patients = () => {
    const [currentTable, setCurrentTable] = useState("patient-table");
    const [patientID, setPatientID] = useState("");

    const [patientName, setPatientName] = useState("");
    const [mobileNo, setMobileNo] = useState();
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
     
    console.log();

    return (
        <div className='patients-container'>

            {currentTable === "patient-table" && <PatientsTable setCurrentTable={setCurrentTable} setPatientID={setPatientID} />}
            {currentTable === "add-new-patient" && <AddPatient setCurrentTable={setCurrentTable} />}
            {currentTable === "patient-info" && <PatientInfo 
            setCurrentTable={setCurrentTable} 
            patientID={patientID} 
            setPatientName={setPatientName}
            setMobileNo={setMobileNo}
            setEmail={setEmail}
            setGender={setGender}
            />}
             
               
            {currentTable === "book_Appointment" && <button onClick={() => setCurrentTable("patient-info")}>Back</button>}
            {currentTable === "book_Appointment" && <AppointmentAddNew setCurrentTable={setCurrentTable} patientID={patientID} patientName={patientName} mobileNo={mobileNo} email={email} gender={gender} />}
           
            {currentTable === "labrecords" && <button onClick={() => setCurrentTable("patient-info")}>Back</button>}
            {currentTable === "labrecords" && <LabRecords setCurrentTable={setCurrentTable} patientID={patientID} patientName={patientName} mobileNo={mobileNo} />}
           
            {currentTable === "consumematerial" && <button onClick={() => setCurrentTable("patient-info")}>Back</button>}
            {currentTable === "consumematerial" && <ConsumeMaterial setCurrentTable={setCurrentTable} patientID={patientID} patientName={patientName} />}
           
            {currentTable === "consultingfee" && <button onClick={() => setCurrentTable("patient-info")}>Back</button>}
            {currentTable === "consultingfee" && <ConsultingFee setCurrentTable={setCurrentTable} patientID={patientID} patientName={patientName} />}
             
        </div>
    ); 
};

export default Patients;