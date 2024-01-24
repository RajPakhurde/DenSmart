import React from "react";

const SalaryRecords = (props) => {
    return (
        <div class="popup-record sub-tables">
            <div className="lab-record-form">

            
            <div className="form-header">
                <div className="form-heading">Save Salary Records</div>
                <div className="close-btn" onClick={() =>{
                    props.setCurrentTable("salaryrecords");
                    }}  >&times;</div>
            </div>
            <hr />

            <form className="form" >
                <div className="first-row-lab-records ">
                    <div className="form-element input-container">
                        <input type="text" id="employee-name" required />
                        <label>Employee Name</label> 
                    </div>
                    <div className="form-element input-container">
                        <input type="number" id="salary-paid" required />
                        <label>Salary Paid</label> 
                    </div>
                </div>
                <div className="second-row-lab-records ">
                    <div className="dates">
                        <label for="date">Date</label>
                        <input type="date" id="date" required />
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

export default SalaryRecords;