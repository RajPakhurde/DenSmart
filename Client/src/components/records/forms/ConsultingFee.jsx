import React, { useState } from "react";

const ConsultingFee = (props) => {
    const [patientName, setPatientName] = useState(props.patientName);
    const [treatment, setTreatment] = useState();
    const [doctorName, setDoctorName] = useState();
    const [creaditedAmount, setCreditedAmount] = useState();
    const [consultingAmount, setConsultingAmount] = useState();
    const [date, setDate] = useState();
    const [modeOfPayment, setModeOfPayment] = useState();
    const [patientID, setPatientID] = useState(props.patientID);

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = {patientName, treatment, doctorName, creaditedAmount, consultingAmount, date, modeOfPayment, patientID};
            const response = await fetch("http://localhost:8080/consultingfee", {
                method: "POST",
                headers: {"content-type": "application/json"},
                body: JSON.stringify(body)
            })           
            alert("New Consulting Fee Record Added!!");
           
        } catch (error) {
            console.log(error.message);
        }
    }


    return (
        <div class="popup-record sub-tables">
            <div className="lab-record-form">

            
            <div className="form-header">
                <div className="form-heading">Save Consulting Fees Records</div>
                {props.openInRecords !== undefined ? <div className="close-btn" onClick={() =>{
                    props.setCurrentTable("consultingfee");
                    }}  >&times;</div> : null }
                
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
                        <input type="number" id="credited-amount" required 
                        onChange={e => setCreditedAmount(e.target.value)} 
                        />
                        <label>Credited Amount</label> 
                    </div>
                    <div className="form-element input-container">
                        <input type="number" id="consultant-amount" required
                        onChange={e => setConsultingAmount(e.target.value)}
                        />
                        <label>Consultant Amount</label> 
                    </div>
                    <div className="form-element input-container">
                        <input type="text" id="pid" required 
                        value={patientID}
                        onChange={e => setPatientID(e.target.value)}
                        />
                        <label>PID</label> 
                    </div>
                    
                </div>
                <div className="second-row-lab-records ">
                    <select name="treatment-name" id="treatment-name" required
                        onChange={e => setTreatment(e.target.value)}
                    
                    >
                        <option value="default">--Treatments--</option>
                        <option value="Complete Denture">Complete Denture</option>
                        <option value="Composite Restoration">
                            Composite Restoration
                        </option>
                        <option value="Consultation">Consultation</option>
                        <option value="Crown">Crown</option>
                        <option value="Extraction">Extraction</option>
                        <option value="FPD">FPD</option>
                        <option value="Implant">Implant</option> 
                        <option value="Orthodontic Treatment">
                            Orthodontic Treatment
                        </option>
                        <option value="Root Canal Treatment">
                            Root Canal Treatment 
                        </option>
                    </select>
                    <select name="doctor-name" id="form-doctor-name" required
                        onChange={e => setDoctorName(e.target.value)}
                    
                    >
                        <option value="default">--Doctors--</option>
                        <option value="Dr. Ritesh Mehta">Dr. Ritesh Mehta</option>
                    </select>
                    <select name="modeofpayment" id="form-payment-mode" required
                        onChange={e => setModeOfPayment(e.target.value)}
                    
                    >
                        <option value="default">--Mode of Payment--</option>
                        <option value="online">Online</option>
                        <option value="Cash">Cash</option>
                    </select>

                    <div className="dates form-element">
                        <label for="date">Date</label>
                        <input type="date" id="date" required 
                        onChange={e => setDate(e.target.value)}
                        
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

export default ConsultingFee;