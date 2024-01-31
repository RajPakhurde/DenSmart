import React, { useState } from "react";

const MaintenanceRecords = (props) => {
    const [maintenanceWork, setMaintenanceWork] = useState("");
    const [chargesPaid, setChargesPaid] = useState();
    const [date, setDate] = useState("");

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = {chargesPaid, date, maintenanceWork};
            const response = await fetch("http://localhost:8080/maintenance-record", {
                method: "POST",
                headers: {"content-type": "application/json"},
                body: JSON.stringify(body)

            })
            alert("New Maintenance Recorde Added Successfully!");
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div class="popup-record sub-tables">
            <div className="lab-record-form">

            
            <div className="form-header">
                <div className="form-heading">Save Maintenance Records</div>
                <div className="close-btn" onClick={() =>{
                    props.setCurrentTable("maintenancerecords");
                    }}  >&times;</div>
            </div>
            <hr />

            <form className="form" onSubmit={onSubmitForm}>
                <div className="first-row-lab-records ">
                    <div className="form-element input-container">
                        <input type="text" id="maintenance-work" required onChange={e => setMaintenanceWork(e.target.value)} />
                        <label>Maintenance Work</label>  
                    </div>
                    <div className="form-element input-container">
                        <input type="number" id="charges-paid" required onChange={e => setChargesPaid(e.target.value)}/>
                        <label>Charges Paid</label> 
                    </div>
                </div>
                <div className="second-row-lab-records ">
                    <div className="dates form-element">
                        <label for="date">Date</label>
                        <input type="date" id="date" required onChange={e => setDate(e.target.value)} />
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

export default MaintenanceRecords;