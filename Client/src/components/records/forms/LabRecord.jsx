import React from "react";

const LabRecords = (props) => {
    return (
        <div class="popup-record sub-tables">
            <div className="lab-record-form">

            
            <div className="form-header">
                <div className="form-heading">Save Lab Records</div>
                <div className="close-btn" onClick={() =>{
                    props.setCurrentTable("labrecords");
                    }}  >&times;</div>
            </div>
            <hr />

            <form className="form" >
                <div className="first-row-lab-records ">
                    <div className="form-element input-container">
                        <input type="text" id="patient-name" required 
                        value={props.patientName !== undefined ? props.patientName : ""}
                        />
                        <label>Patient Name</label> 
                    </div>
                    <div className="form-element input-container">
                        <input type="number" id="mobile-no" required 
                        value={props.mobileNo !== undefined ? props.mobileNo : ""}
                        />
                        <label>Mobile No</label> 
                    </div>
                    <div className="form-element input-container">
                        <input type="text" id="lab-work" required />
                        <label>Lab Work</label> 
                    </div>
                    <div className="form-element input-container">
                        <input type="text" id="lab-name" required />
                        <label>Lab Name</label> 
                    </div>
                    <div className="form-element input-container">
                        <input type="number" id="patient-name" required />
                        <label>Lab Charges</label> 
                    </div>
                </div>
                <div className="second-row-lab-records ">
                    <div className="dates form-element">
                        <label for="impression-date">Impression Date</label>
                        <input type="date" id="impression-date" required />
                    </div>
                    <div className="dates form-element">
                        <label for="send-date">send Date</label>
                        <input type="date" id="send-date" required />
                    </div>
                    <div className="dates form-element">
                        <label for="receive-date">Receive Date</label>
                        <input type="date" id="receive-date" required />
                    </div>
                    <div className="dates form-element">
                        <label for="Insertion-date">send Date</label>
                        <input type="date" id="Insertion-date" required />
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