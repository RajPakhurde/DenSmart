import { Portal } from "@mui/material";
import React, { useState } from "react";

const LabRecords = (props) => {
    const [patientName, setPatientName] = useState(props.patientName);
    const [mobile, setMobile] = useState(props.mobileNo);
    const [labWork, setLabWork] = useState();
    const [labName, setLabName] = useState();
    const [labCharges, setLabCharges] = useState();
    const [impressionDate, setImpressionDate] = useState();
    const [sendDate, setSendDate ] = useState();
    const [reciveDate, setReciveDate] = useState();
    const [insertionDate, setInsertionDate] = useState();
    const [patientID, setPatientID] = useState(props.patientID);

    console.log(patientID);

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = {patientName, mobile, labWork, labName, labCharges, impressionDate, sendDate, reciveDate, insertionDate, patientID};
            const response = await fetch("http://localhost:8080/lab", {
                method: "POST",
                headers: {"content-type": "application/json"},
                body: JSON.stringify(body)
            })           
            alert("New Lab Record Added!!");
           
        } catch (error) {
            console.log(error.message);
        }
    }
   

    return (
        <div class="popup-record sub-tables">
            <div className="lab-record-form">

            
            <div className="form-header">
                <div className="form-heading">Save Lab Records</div>
                {props.openInRecords !== undefined ?  <div className="close-btn" onClick={() =>{props.setCurrentTable("labrecords"); }}  >&times;</div> : null}
                {/* <div className="close-btn" onClick={() =>{
                    props.setCurrentTable("labrecords");
                    }}  >&times;</div> */}
            </div>
            <hr />

            <form className="form" onSubmit={onSubmitForm}>
                <div className="first-row-lab-records ">
                    <div className="form-element input-container">
                        <input type="text" id="patient-name" required 
                        value={patientName}
                        onChange={e => setPatientName(e.target.value)}
                        />
                        <label>Patient Name</label> 
                    </div>
                    <div className="form-element input-container">
                        <input type="number" id="mobile-no" required 
                        value={mobile}
                        onChange={e => setMobile(e.target.value)}
                        />
                        <label>Mobile No</label> 
                    </div>
                    <div className="form-element input-container">
                        <input type="text" id="lab-work" required 
                         onChange={e => setLabWork(e.target.value)}
                        />
                        <label>Lab Work</label> 
                    </div>
                    
                </div>
                <div className="first-row-lab-records ">
                <div className="form-element input-container">
                        <input type="text" id="lab-name" required
                         onChange={e => setLabName(e.target.value)}
                        />
                        <label>Lab Name</label> 
                    </div>
                    <div className="form-element input-container">
                        <input type="number" id="patient-name" required 
                         onChange={e => setLabCharges(e.target.value)}
                        />
                        <label>Lab Charges</label> 
                    </div>
                    <div className="form-element input-container">
                        <input type="text" id="patient-name" required 
                        value={patientID}
                         onChange={e => setPatientID(e.target.value)}
                        />
                        <label>PID</label> 
                    </div>
                </div>
                <div className="second-row-lab-records ">
                    <div className="dates form-element">
                        <label for="impression-date">Impression Date</label>
                        <input type="date" id="impression-date" required 
                         onChange={e => setImpressionDate(e.target.value)}
                        />
                    </div>
                    <div className="dates form-element">
                        <label for="send-date">send Date</label>
                        <input type="date" id="send-date" required 
                         onChange={e => setSendDate(e.target.value)}
                        />
                    </div>
                    <div className="dates form-element">
                        <label for="receive-date">Receive Date</label>
                        <input type="date" id="receive-date" required 
                         onChange={e => setReciveDate(e.target.value)}
                        />
                    </div>
                    <div className="dates form-element">
                        <label for="Insertion-date">Insertion Date</label>
                        <input type="date" id="Insertion-date" required
                         onChange={e => setInsertionDate(e.target.value)}
                        />
                    </div>
                </div>    

                <hr />

                <div id="form-row-5" className="form-row form-row-5">
                    <button type="submit" className="submit-btn">Save</button>
                    <button type="reset" className="reset-btn">Reset</button>
                </div>
            </form>
            </div>
    </div>
    );
};

export default LabRecords;