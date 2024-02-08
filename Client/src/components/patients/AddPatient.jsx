import { Zoom } from '@mui/material';
import React, { useState } from 'react'

const AddPatient = (props) => {
    const [patientName, setPatientName] = useState("")
    const [regDate, setRegDate] = useState("")
    const [gender, setGender ] = useState("")
    const [age, setAge] = useState()
    const [address, setAddress] = useState("")
    const [email, setEmail] = useState("")
    const [mobile, setMobile] = useState()

    // Add data in patient table
    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = {patientName, regDate, gender, age, address, email, mobile};
            const response = await fetch("http://localhost:8080/patients", {
                method: "POST",
                headers: {"content-type": "application/json"},
                body: JSON.stringify(body)
            })

            setPatientName("");
            setRegDate("");
            setGender("");
            setAge("");
            setAddress("");
            setEmail("");
            setMobile("");
            alert("Patient Register Successfully!");

        } catch (error) {
            console.log(error.message); 
        }
    }

    const handleClick = () => {
        if (props.setCurrentTable !== undefined) props.setCurrentTable("patient-table");

        if (props.setCurrentCompnent !== undefined) props.setCurrentCompnent("1");
         
    }
   
    const popupStyle = {
        width: "calc(100% - 340px)",
        position: "absolute",
        right: "0%"
    }

    return (
        <Zoom in={true}>
        <div class="popup-record sub-tables" style={props.setCurrentCompnent !== undefined ? popupStyle : null }>
            <div className="lab-record-form">

            
            <div className="form-header">
                <div className="form-heading">Add New Patient</div>
                <div className="close-btn" onClick={handleClick}  >&times;</div>
            </div>
            <hr />

            <form className="form" onSubmit={onSubmitForm}>
                <div className="first-row-lab-records ">
                    <div className="form-element input-container">
                        <input type="text" id="patient-name" required value={patientName} onChange={e => setPatientName(e.target.value)}/>
                        <label>Patient Name</label> 
                    </div>
                    <div className="form-element input-container">
                        <input type="number" id="mobile-num" required value={mobile} onChange={e => setMobile(e.target.value)} />
                        <label>Whatsapp Mobile No</label> 
                    </div>
                    <div className="form-element input-container">
                        <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
                        <label>Email</label> 
                    </div>
                    <div className="dates form-element">
                        <label for="date">Date</label>
                        <input type="date" id="date" required onChange={e => setRegDate(e.target.value)} />
                    </div>
                </div>
                <div className="second-row-lab-records ">
                    <div className="form-element input-container">
                        <input type="text" id="address" required value={address} onChange={e => setAddress(e.target.value)} />
                        <label>Address</label> 
                    </div>
                     
                    <div className="form-element input-container">
                        <input type="number" id="age" value={age} onChange={e => setAge(e.target.value)} />
                        <label>age</label> 
                    </div>
                     
                    <select name="gender" id="gender" required value={gender} onChange={e => setGender(e.target.value)} >
                        <option selected value="Gender">--Gender--</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
          
                    
                </div>    

                <hr />

                <div id="form-row-5" className="form-row form-row-5">
                    <button type="submit" className="submit-btn">Save</button>
                    <button type="reset" className="reset-btn">Reset</button>
                </div>
            </form>
            </div>
        </div>
        </Zoom>
    )
};

export default AddPatient;