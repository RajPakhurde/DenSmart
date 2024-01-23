import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const AppointmentAddNew = () => {
   
    return (
        <div className='appointment-booking'>
            <form>
          <div className="form">
            <div id="form-row-1" class="form-row">
              <div className="form-element input-container">
                <input type="text" id="patient-name" required/>
                <label>Patient Name</label> 
              </div> 
              <div className="form-element input-container">
                <input type="number" id="mobile-num" required/>
                <label>Whatsapp Mobile No</label> 
              </div>
              <div className="form-element input-container">
                <input type="email" id="email" />
                <label>Email</label> 
              </div>
              
            </div>
            <div id="form-row-2" className="form-row form-row-2">
              <div className="form-element">
                <select name="doctor-name" id="form-doctor-name" required>
                  <option value="default">--Doctors--</option>
                  <option value="Dr. Ritesh Mehta">Dr. Ritesh Mehta</option>
                </select>
              </div>
              <div className="form-element">
                <label for="form-date">Date</label> <br />
                <input type="date" id="form-date" required/>
              </div>
              <div className="form-element">
                <label for="from-time">From Time</label> <br />
                <input type="time" id="from-time" required/>
              </div>
              <div className="form-element">
                <label for="to-time">To Time</label> <br />
                <input type="time" id="to-time" required/>
              </div>
            </div>
            <div id="form-row-3" class="form-row">
              <div className="form-element">
                <select name="gender" id="gender" required>
                  <option selected value="Gender">--Gender--</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-element">
                <select name="status" id="status" required>
                  <option selected value="Status">--Status--</option>
                  <option value="new">New</option>
                  <option value="checkin">CheckIn</option>
                  <option value="cancel">Cancel</option>
                </select>
              </div>
              <div className="form-element">
                <select name="treatment-name" id="treatment-name" required>
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
              <button type="submit" id="submit-btn">Submit</button>
              <button type="reset" id="reset-btn">Reset</button>
            </div>
          </div>
        </form>
        </div>
    );
};

export default AppointmentAddNew;