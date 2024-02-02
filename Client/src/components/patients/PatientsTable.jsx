import React, { useState, useEffect } from "react";

const PatientsTable = (props) => {
    const [patientsData, setPatientsData] = useState([]);


    function handleClick(patientID) {
        // props.setCurrentTable(event.target.id);
        props.setPatientID(patientID)
        console.log(patientID);
    }

     // Get all patients data
     const getPatientsData = async () => {
        try {
            const response = await fetch("http://localhost:8080/patients");
            const jsonData = await response.json();

            setPatientsData(jsonData);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {   
        getPatientsData();
    },[]);

    let sNo = 1;

    return (
        <div className="patient-info">
            <div className="searchbar">
                <div className=" input-container">
                    <input type="search" name="searchPatients" className="searchPatients" placeholder=" PID / Name / Mobile No"/>
                    <p><i class="fa-solid fa-magnifying-glass"></i></p>
                </div>
                <div>
                    <button id="add-new-patient" className="new-btn-appointment" onClick={handleClick}>+ New</button>
                </div>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th className="table-header" id="sno">SNo</th>
                        <th className="table-header" id="patient-name">Patient Name</th>
                        <th className="table-header" id="pid">PID</th>
                        <th className="table-header" id="regdate">Reg. Date</th>
                        <th className="table-header" id="gender">Gender</th>
                        <th className="table-header" id="age">Age</th>
                        <th className="table-header" id="address">Address</th>
                        <th className="table-header" id="mobile">Mobile</th>
                        <th className="table-header" id="email">Email</th>
                        {/* <th className="table-header" id="medicalhistory">Medical History</th> */}
                        <th className="table-header" id="controls">Controls</th>
                    </tr>
                </thead>
                <tbody>
                    {patientsData.map((patient) => {
                        return <tr>
                                <td>{sNo++}</td>
                                <td
                                id="patient-info"
                               
                                onClick={(event) => {
                                    props.setCurrentTable(event.target.id);
                                    handleClick(patient.pid);
                                }}
                                >{patient.patient_name}</td>
                                <td>{patient.pid}</td>
                                <td>{patient.reg_date.split('T')[0]}</td>
                                <td>{patient.gender}</td>
                                <td>{patient.age}</td>
                                <td>{patient.address}</td>
                                <td>{patient.mobile}</td>
                                <td>{patient.email}</td>
                                <td>
                                <i class="fa-solid fa-pencil"></i>
                                <i class="fa-solid fa-trash"></i>
                                </td>
                        </tr>
                    })}
                </tbody>
                <tr>
                  
                </tr>
            </table>

        </div>
    );
};

export default PatientsTable;
