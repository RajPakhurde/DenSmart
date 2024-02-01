import React, { useState, useEffect } from 'react';

const PatientInfo = (props) => {
    const [patientInfo, setPatientInfo] = useState([]);

// Get Patient info
    const getPatientInfo = async () => {
        const pid = props.patientID;
        try {
            const response = await fetch("http://localhost:8080/patients/"+pid);
            const jsonData = await response.json();

            setPatientInfo(jsonData);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getPatientInfo();
    }, []);
 

    props.setPatientName(patientInfo.patient_name);
    props.setMobileNo(patientInfo.mobile);
    props.setEmail(patientInfo.email);
    props.setGender(patientInfo.gender);

    function handleClick(event) {
        props.setCurrentTable(event.target.id);
    }

    return <div className='patient-selected'>

        <div className="form-header">
                <div className="form-heading"><h1>Patient Details</h1></div>
                <div className="close-btn" onClick={() =>{
                    props.setCurrentTable("patient-table");
                    }}  >&times;</div>
        </div>
        <div>
            <div className='patient-info-selected'>
                <div className=''>
                    <h1>{patientInfo.patient_name}</h1>
                    <h3>PID:- {props.patientID}</h3>
                    <h5>Mobile No:- {patientInfo.mobile}</h5>
                    <h5>Email :- {patientInfo.email}</h5>
                    <h5>Reg-Date:- {patientInfo.reg_date}</h5>
                    <h5>Address:- {patientInfo.address}</h5>
                    <h5>Age:- {patientInfo.age}</h5>
                    <h5>Gender:- {patientInfo.gender}</h5>
                </div>
            <div className='btn-patient-info'>
                <button 
                id='book_Appointment' 
                onClick={handleClick}>
                Book Appoiment
                </button>
                <button id='labrecords' onClick={handleClick}  >Add Lab Records</button>
                <button id='consumematerial' onClick={handleClick}  >Add Consume Material Record</button>
                <button id='consultingfee' onClick={handleClick}  >Add Consulting Fees</button>
            </div>
            </div>
        </div>
    </div>
};

export default PatientInfo;