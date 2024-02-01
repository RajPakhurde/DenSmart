import React, { useState } from "react";

const ConsumeMaterial = (props) => {
    const [patientName, setPatientName] = useState(props.patientName);
    const [materialName, setMaterialName] = useState();
    const [date, setDate] = useState();
    const [doses, setDoses] = useState();
    const [patientID, setPatientID] = useState(props.patientID);

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = {patientName, materialName, date, doses, patientID};
            const response = await fetch("http://localhost:8080/consumematerial ", {
                method: "POST",
                headers: {"content-type": "application/json"},
                body: JSON.stringify(body)
            })           
            alert("Consume Material Record Added!!");
           
        } catch (error) {
            console.log(error.message);
        }
    }


    return (
        <div class="popup-record sub-tables">
            <div className="lab-record-form">

            
            <div className="form-header">
                <div className="form-heading">Save Consume Material Records</div>
                <div className="close-btn" onClick={() =>{
                    props.setCurrentTable("consumematerial");
                    }}  >&times;</div>
            </div>
            <hr />

            <form className="form" onSubmit={onSubmitForm} >
                <div className="first-row-lab-records ">
                    <div className="form-element input-container">
                        <input type="text" id="user-name" required 
                        value={patientName}
                        onChange={e => setPatientName(e.target.value)}
                        />
                        <label>Patient Name</label> 
                    </div>
                    <div className="form-element input-container">
                        <input type="text" id="material-name" required
                        onChange={e => setMaterialName(e.target.value)}
                        />
                        <label>Material Name</label> 
                    </div>
                </div>
                <div className="second-row-lab-records ">
                    <div className="dates form-element">
                        <label for="date">Date</label>
                        <input type="date" id="date" required 
                        onChange={e => setDate(e.target.value)}
                        />
                    </div>
                    <div className="form-element input-container">
                        <input type="number" id="doses" required 
                        onChange={e => setDoses(e.target.value)}
                        />
                        <label>Doses</label> 
                    </div>
                </div>    
                <div className="form-element input-container">
                    <input type="text" id="pid" required 
                    value={patientID}
                    onChange={e => setPatientID(e.target.value)}
                    />
                    <label>PID</label> 
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

export default ConsumeMaterial;