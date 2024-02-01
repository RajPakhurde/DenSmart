import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const AppointmentAddNew = (props) => {
    const [patientName, setPatientName] = useState(props.patientName);
    const [treatment, setTreatment] = useState("");
    const [doctorName, setDoctorName] = useState("");
    const [inTime, setInTime] = useState();
    const [outTime, setOutTime] = useState();
    const [status, setStatus] = useState("");
    const [mobile, setMoblie] = useState(props.mobileNo);
    const [patientID, setPatientID] = useState(props.patientID);
    const [appDate, setDate] = useState("");
    const [email, setEmail] = useState(props.email);
    
   
    const onSubmitForm = async (e) => {
      e.preventDefault();
      try {
          const body = {patientName, treatment, doctorName, inTime, outTime, status, mobile, patientID, appDate};
          const response = await fetch("http://localhost:8080/appointment", {
              method: "POST",
              headers: {"content-type": "application/json"},
              body: JSON.stringify(body)
          })           
          alert("Appointment booked succesfully!!");
         
      } catch (error) {
          console.log(error.message);
      }
  }
 
  
    return (
        <div className='appointment-booking' >
          <form onSubmit={onSubmitForm}>
          <div className="form">
            <div id="form-row-1" class="form-row">
              <div className="form-element input-container">
                <input type="text" id="patient-name" required 
                // value={props.patientName !== undefined ? props.patientName : patientName}
                value={patientName}
                onChange={e => setPatientName(e.target.value)}
                />
                <label>Patient Name</label> 
              </div> 
              <div className="form-element input-container">
                <input type="number" id="mobile-num" required 
                value={mobile}
                onChange={e => setMoblie(e.target.value)}
                />
                <label>Whatsapp Mobile No</label> 
              </div>
              <div className="form-element input-container">
                <input type="email" id="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                />
                <label>Email</label> 
              </div>
              <div className="form-element input-container">
                <input type="text" id="patientID" required
                value={patientID}
                onChange={e => setPatientID(e.target.value)}
                />
                <label>PID</label> 
              </div>
              
            </div>
            <div id="form-row-2" className="form-row form-row-2">
              <div className="form-element">
                <select name="doctor-name" id="form-doctor-name" required
                onChange={e => setDoctorName(e.target.value)}
                >
                  <option value="default">--Doctors--</option>
                  <option value="Dr. Ritesh Mehta">Dr. Ritesh Mehta</option>
                </select>
              </div>
              <div className="form-element">
                <label for="form-date">Date</label> <br />
                <input type="date" id="form-date" required 
                value={appDate}
                onChange={e => setDate(e.target.value)}
                />
              </div>
              <div className="form-element">
                <label for="from-time">From Time</label> <br />
                <input type="time" id="from-time" required  
                onChange={e => setInTime(e.target.value)}
                value={inTime}
                />
              </div>
              <div className="form-element">
                <label for="to-time">To Time</label> <br />
                <input type="time" id="to-time" required 
                onChange={e => setOutTime(e.target.value)}
                value={outTime}
                />
              </div>
            </div>
            <div id="form-row-3" class="form-row">
              {/* <div className="form-element">
                <select name="gender" id="gender" required 
                value={props.gender !== undefined ? props.gender : ""}
                onChange={e => setgen(e.target.value)}
                >
                  <option selected value="Gender">--Gender--</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div> */}
              <div className="form-element">
                <select name="status" id="status" required
                onChange={e => setStatus(e.target.value)}
                >
                  <option selected value="Status">--Status--</option>
                  <option value="new">New</option>
                  <option value="checkin">CheckIn</option>
                  <option value="cancel">Cancel</option>
                </select>
              </div>
              <div className="form-element">
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
              </div>
              <div className="form-element form-checkbox" id="form-element-checkboxs">
                <div>
                  <input type="checkbox" id="send-message" />
                  <label for="send-message" className='email-icon'><i class="fa-solid fa-square-envelope"></i></label>
                </div>
                <div>
                  <input type="checkbox" id="send-whatsapp-msg" />
                  <label for="send-whatsapp-msg" className='whatsapp-icon'><i class="fa-brands fa-square-whatsapp"></i></label>
                </div>
              </div>
            </div>
            <hr />
            <div id="form-row-5" className="form-row form-row-5">
              <button type="submit" className="submit-btn">Submit</button>
              <button type="reset" className="reset-btn">Reset</button>
            </div>
          </div>
        </form>
        </div>
    );
};

export default AppointmentAddNew;