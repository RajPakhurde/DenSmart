import React from "react";

const ConsultingFee = (props) => {
    return (
        <div class="popup-record sub-tables">
            <div className="lab-record-form">

            
            <div className="form-header">
                <div className="form-heading">Save Consulting Fees Records</div>
                <div className="close-btn" onClick={() =>{
                    props.setCurrentTable("consultingfee");
                    }}  >&times;</div>
            </div>
            <hr />

            <form className="form" >
                <div className="first-row-lab-records ">
                    <div className="form-element input-container">
                        <input type="text" id="patient-name" required />
                        <label>Patient Name</label> 
                    </div>
                    <div className="form-element input-container">
                        <input type="number" id="credited-amount" required />
                        <label>Credited Amount</label> 
                    </div>
                    <div className="form-element input-container">
                        <input type="number" id="consultant-amount" required />
                        <label>Consultant Amount</label> 
                    </div>
                    <div className="dates form-element">
                        <label for="date">Date</label>
                        <input type="date" id="date" required />
                    </div>
                </div>
                <div className="second-row-lab-records ">
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
                    <select name="doctor-name" id="form-doctor-name" required>
                        <option value="default">--Doctors--</option>
                        <option value="Dr. Ritesh Mehta">Dr. Ritesh Mehta</option>
                    </select>
                    <select name="modeofpayment" id="form-payment-mode" required>
                        <option value="default">--Mode of Payment--</option>
                        <option value="online">Online</option>
                        <option value="Cash">Cash</option>
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
    );
};

export default ConsultingFee;