import React, { useState, useEffect } from "react";

const PatientsTable = (props) => {
    const [patientsData, setPatientsData] = useState([]);


    function handleClick(patientID) {
        // props.setCurrentTable(event.target.id);
        props.setPatientID(patientID)
        console.log("patient id is : " ,patientID);
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

    // Search 
    const searchQuery = async (e) => {
        try {
            const response = await fetch("http://localhost:8080/search-patient?term="+e.target.value);
            const jsonData = await response.json();

            if (jsonData.length === 0) return getPatientsData()
            setPatientsData(jsonData); 
            
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {   
        getPatientsData();
    },[]);

    let sNo = 1;

    const handleBtnClick = async (id) => {
        try {
            const deletePatient = await fetch("http://localhost:8080/patients/"+id, {
                method: "DELETE"
            });

            getPatientsData();
        } catch (error) {
            console.log(error.message);
        } 
    }

    return (
        <div className="patient-info">
            <div className="searchbar">
                <div className=" input-container">
                    <input type="search" name="searchPatients" className="searchPatients" placeholder=" PID / Name / Mobile No"
                    onChange={searchQuery}
                    />
                </div>
                <div>
                    <button id="add-new-patient" className="new-btn-appointment" onClick={() => props.setCurrentTable("add-new-patient")}>+ New</button>
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
                                className="patient-name"
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
                                <td className='patient-delete-btn'>
                                <i class="fa-solid fa-pencil"></i>
                                <i class="fa-solid fa-trash"
                                onClick={() => {
                                    if(!window.confirm("Are you sure?")) return
                                    handleBtnClick(patient.pid);
                                }}
                                ></i>
                                </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default PatientsTable;
