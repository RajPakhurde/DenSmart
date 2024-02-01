import React, { useState } from "react";

const SalaryRecords = (props) => {
    const [employeeName, setEmployeeName] = useState("");
    const [salaryPaid, setSalaryPaid] = useState();
    const [date, setDate] = useState();

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = {employeeName, salaryPaid, date};
            const response = await fetch("http://localhost:8080/salary", {
                method: "POST",
                headers: {"content-type": "application/json"},
                body: JSON.stringify(body)
            })

            alert("Salary Record Added!!");
        } catch (error) {
            console.log(error.message);
        }
    }

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

            <form className="form" onSubmit={onSubmitForm}>
                <div className="first-row-lab-records ">
                    <div className="form-element input-container">
                        <input name="employee-name" type="text" id="employee-name" required onChange={e => setEmployeeName(e.target.value)} />
                        <label>Employee Name</label> 
                    </div>
                    <div className="form-element input-container">
                        <input name="salary-paid" type="number" id="salary-paid" required onChange={e => setSalaryPaid(e.target.value)} />
                        <label>Salary Paid</label> 
                    </div>
                </div>
                <div className="second-row-lab-records ">
                    <div className="dates form-element">
                        <label for="date">Date</label>
                        <input name="date" type="date" id="date" required onChange={e => setDate(e.target.value)} />
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