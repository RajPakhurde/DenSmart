import React, { useState, useEffect } from 'react';

const PatientInfo = (props) => {
    const [patientInfo, setPatientInfo] = useState([]);
    const [allAppointment, setAllAppointment] = useState([]);
    const [allLabRecords, setAllLabRecords] = useState([]);
    const [allConsultantingFee, setAllConsultingFee] = useState([]);
    const [allConsumeMaterial, setAllConsumeMaterial] = useState([]);

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

     // Get all Appointment Records
     const getAllAppointment = async () => {
        try {
            const response = await fetch("http://localhost:8080/appointment/"+props.patientID);
            const jsonDate = await response.json();

            setAllAppointment(jsonDate);
        } catch (error) {
            console.log(error.message);
        }
    }

       // Get all Lab Records
       const getAllLabRecords = async () => {
        try {
            const response = await fetch("http://localhost:8080/lab/"+props.patientID);
            const jsonDate = await response.json();

            setAllLabRecords(jsonDate);
        } catch (error) {
            console.log(error.message);
        }
    }

    // Get all ConsultingFee Records
    const getAllConsultingFee = async () => {
        try {
            const response = await fetch("http://localhost:8080/consultingfee/"+props.patientID);
            const jsonDate = await response.json();

            setAllConsultingFee(jsonDate);
        } catch (error) {
            console.log(error.message);
        }
    }

     // Get all CONSUME MATERIAL Records
     const getAllConsumeMaterial = async () => {
        try {
            const response = await fetch("http://localhost:8080/consumematerial/"+props.patientID);
            const jsonDate = await response.json();

            setAllConsumeMaterial(jsonDate);
            console.log(jsonDate);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getPatientInfo();
        getAllAppointment();
        getAllLabRecords();
        getAllConsultingFee();
        getAllConsumeMaterial();
    }, []);
 

    props.setPatientName(patientInfo.patient_name);
    props.setMobileNo(patientInfo.mobile);
    props.setEmail(patientInfo.email);
    props.setGender(patientInfo.gender);

    
    function handleClick(event) {
        props.setCurrentTable(event.target.id);
    }
    
    let sNo = 1;
    
    return <div className='patient-selected'>
        <div className="form-header">
                <div className="form-heading"><h1>Patient Details</h1></div>
                <div className="close-btn" onClick={() =>{
                    props.setCurrentTable("patient-table");
                    }}  >&times;</div>
        </div>
        <div>
            <div className='patient-info-selected'>
                <div className='patient-basic-info'>
                    <h1>{patientInfo.patient_name}</h1>
                    <h3>PID:- <span>{props.patientID}</span></h3>
                    <h5>Mobile No:- <span>{patientInfo.mobile}</span></h5>
                    <h5>Email :- <span>{patientInfo.email}</span></h5>
                    <h5>Reg-Date:- <span>{patientInfo.reg_date}</span></h5>
                    <h5>Address:- <span>{patientInfo.address}</span></h5>
                    <h5>Age:- <span>{patientInfo.age}</span></h5>
                    <h5>Gender:- <span>{patientInfo.gender}</span></h5>
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
            <div className='container'>
            <div className='patient-info-tables patient-info-1'>
                <div className='patient-info-table1'>
                    <h3>Appointment</h3>
                    <table>
                        <thead>
                            <th>SNo</th>
                            <th>Date</th>
                            <th>Treatment</th>
                            <th>Doctor</th>
                            <th>In Time</th>
                            <th>Out Time</th>
                        </thead>
                        <tbody>
                        {allAppointment.length === 0 ? <td colSpan={6} style={{textAlign: 'center', fontSize: '20px'}}>"Result Not Found!"</td> :
                        allAppointment.map((appointment) => {
                        return <tr>
                                    <td>{sNo++}</td>
                                    <td>{appointment.app_date.split('T')[0]}</td>
                                    <td>{appointment.treatment}</td>
                                    <td>{appointment.doctor_name}</td>
                                    <td>{appointment.in_time}</td>
                                    <td>{appointment.out_time}</td>
                                 </tr>
                    })}
                        </tbody>
                    </table>
                </div>
                <div className='patient-info-table1'>
                    <h3>Consulting Fee</h3>
                    <table>
                        <thead>
                            <th>SNo</th>
                            <th>Date</th>
                            <th>Treatment</th>
                            <th>Doctor</th>
                            <th>Mode of Payment</th>
                            <th>Cedited Amount</th>
                            <th>Consultant Amount</th>
                        </thead>
                        <tbody>
                        {allConsultantingFee.length === 0 ? <td colSpan={7} style={{textAlign: 'center', fontSize: '20px'}}>"Result Not Found!"</td> :
                        allConsultantingFee.map((consultingfee) => {
                            sNo = 1;
                            return <tr>
                                        <td>{sNo++}</td>
                                        <td>{consultingfee.date.split('T')[0]}</td>
                                         <td>{consultingfee.treatment}</td>
                                        <td>{consultingfee.doctor_name}</td>
                                        <td>{consultingfee.mode_of_payment}</td>
                                        <td>{consultingfee.creadited_amount}</td>
                                        <td>{consultingfee.consultant_amount}</td>
                                    </tr>
                        })}

                        </tbody>
                    </table>
                </div>
            </div>
            <div className='patient-info-tables patient-info-2'>
               
                <div className='patient-info-table2'>
                    <h3>Consume Material</h3>
                    <table>
                        <thead>
                            <th>SNo</th>
                            <th>Date</th>
                            <th>Material Name</th>
                            <th>Doses</th>
                        </thead>
                        <tbody>
                        {allConsumeMaterial.length === 0 ? <td colSpan={4} style={{textAlign: 'center', fontSize: '20px'}}>"Result Not Found!"</td> :
                        allConsumeMaterial.map((consumeMaterial) => {
                            console.log(allConsumeMaterial.length);
                            return  <tr>
                                        <td>{consumeMaterial.consume_material_id}</td>
                                        <td>{consumeMaterial.date.split('T')[0]}</td>
                                        <td>{consumeMaterial.material_name}</td>
                                        <td>{consumeMaterial.doses}</td>
                                     </tr>
                        })}

                        </tbody>
                    </table>
                </div>
                <div className='patient-info-table2'>
                    <h3>Lab Records</h3>
                    <table>
                        <thead>
                            <th>SNo</th>
                            <th>Date</th>
                            <th>Lab Work</th>
                            <th>Lab Name</th>
                            <th>Lab Charges</th>
                        </thead>
                        <tbody>
                        {allLabRecords.length === 0 ? <td colSpan={5} style={{textAlign: 'center', fontSize: '20px'}}>"Result Not Found!"</td> :
                        allLabRecords.map((labRecord) => {
                            sNo = 1;
                            return <tr>
                                        <td>{sNo++}</td>
                                        <td>{labRecord.recive_date.split('T')[0]}</td>
                                        <td>{labRecord.lab_work}</td>
                                        <td>{labRecord.lab_name}</td>
                                        <td>{labRecord.lab_charges}</td>  
                                    </tr>
                        })}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </div>
    </div>
};

export default PatientInfo;