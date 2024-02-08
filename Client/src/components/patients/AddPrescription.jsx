import { Zoom } from '@mui/material';
import React from 'react';
import { useState, useEffect } from 'react';

const AddPrescription = (props) => {
    const [medicineName, setMedicineName] = useState("");
    const [doses, setDoses] = useState();
    const [days, setDays] = useState();
    const [instruction, setInstruction ] = useState();
    const [patientID, setPatientID] = useState(props.patientID);
    const [appID, setAppId] = useState(props.appId);
    
    // Add data in prescription table
    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = {medicineName, doses, days, instruction, patientID, appID};
            const response = await fetch("http://localhost:8080/prescription", {
                method: "POST",
                headers: {"content-type": "application/json"},
                body: JSON.stringify(body)
            })           
        } catch (error) {
            console.log(error.message);
        }
    }

    const [prescription, setPrescription] = useState([]);
    let sNo = 1;

     // Get all Appointment Records
     const getCurrectnPrescription = async () => {
        try {
            const response = await fetch("http://localhost:8080/prescription/"+appID);
            const jsonDate = await response.json();

            setPrescription(jsonDate);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getCurrectnPrescription();
    }, []);

  
    const handleClick = async (id) => {
        try {
            const deleteapp = await fetch("http://localhost:8080/prescription/"+id, {
                method: "DELETE"
            });

            getCurrectnPrescription();
        } catch (error) {
            console.log(error.message);
        } 
    }

    // Update prescription status
   const updatePreStatus = async (id) => { 
    try {
        const response = await fetch("http://localhost:8080/prescription/"+id, {
            method: "PUT",
            headers: {"content-type": "application/json"},
        }) 
  
    } catch (error) {
        console.log(error.message);
    }
}

    return (
        <Zoom in={true}>
            <div className='prescription-comp'>
                <div>
                    <div className="form-header">
                        <div className="form-heading"><h1>Add Prescription</h1></div> 
                            <div className="close-btn" onClick={() =>{
                                props.setCurrentTable("patient-info");
                                }}  >&times;
                            </div>
                        </div>
                        <hr />
                </div>
                <div style={{display: "flex", justifyContent: "center", marginTop: "40px", gap: "20px"}}>
                <div  >
                    <form className="form" onSubmit={onSubmitForm}>
                        <div className="first-row-lab-records ">
                            <div className="form-element input-container">
                                <input type="text" id="medicine-name" required onChange={e => setMedicineName(e.target.value)} />
                                <label>Medicine Name</label> 
                            </div>
                            <div>
                            <select name="dealer-name" id="form-dealer-name"  required onChange={e => setInstruction(e.target.value)}  >
                                <option value="default">--Instruction--</option>
                                <option value="After meal-Morning / जेवणानंतर-सकाळी">After meal-Morning / जेवणानंतर-सकाळी </option>
                                <option value="After meal-Afternoon / जेवणानंतर-दुपारी ">After meal-Afternoon / जेवणानंतर-दुपारी </option>
                                <option value="After meal-Night / जेवणानंतर-रात्री">After meal-Night / जेवणानंतर-रात्री  </option>

                                <option value="Before meal-Morning / जेवणापूर्वी-सकाळी">Before meal-Morning / जेवणापूर्वी-सकाळी </option>
                                <option value="Before meal-Afternoon / जेवणापूर्वी-दुपारी">Before meal-Afternoon / जेवणापूर्वी-दुपारी </option>
                                <option value="Before meal-Night / जेवणापूर्वी-रात्री">Before meal-Night / जेवणापूर्वी-रात्री </option>

                                <option value="Empty Stomach-Morning / उपाशी पोटी-सकाळी">Empty Stomach-Morning / उपाशी पोटी-सकाळी </option>
                                <option value="Empty Stomach-Afternoon / उपाशी पोटी-दुपारी">Empty Stomach-Afternoon / उपाशी पोटी-दुपारी </option>
                                <option value="Empty Stomach-Night / उपाशी पोटी-रात्री">Empty Stomach-Night / उपाशी पोटी-रात्री </option>
                                
                            </select>
                            </div>
                        </div>

                        <div className="first-row-lab-records ">
                            <div className="form-element input-container">
                                <input type="number" id="charges" required onChange={e => setDoses(e.target.value)} />
                                <label>Doses</label> 
                            </div>
                            <div className="form-element input-container">
                                <input type="number" id="total-charges" required onChange={e => setDays(e.target.value)} />
                                <label>Days</label> 
                            </div>
                        </div>
                        
                          

                        <hr />

                        <div id="form-row-5" className="form-row form-row-5">
                            <button type="submit" className="submit-btn" onClick={() => {
                                setTimeout(() => {
                                    getCurrectnPrescription();
                                }, 500);
                            }}>Add</button>
                            <button type="reset" className="reset-btn">Reset</button>
                        </div>
                    </form>
                </div>
                <div style={{width: "900px"}}>
                <table className="table prescription-table">
                <thead>
                    <tr> 
                        <th class="table-header" id="sno">SNo</th>
                        <th class="table-header" id="patient-name">Medicine Name</th>
                        <th class="table-header" id="date">Doses</th>
                        <th class="table-header" id="treatment">Instruction</th>
                        <th class="table-header" id="doctors">Days</th>
                        <th class="table-header" id="controls">Controls</th>
                    </tr>
                </thead>
                <tbody>
                    {prescription.map((prescription) => {
    
                        return <tr>
                                    <td>{sNo++}</td>
                                    <td>{prescription.medicine_name}</td>
                                    <td>{prescription.doses}</td>
                                    <td>{prescription.instruction}</td>
                                    <td>{prescription.days}</td>
                                    <td className='app-delete-btn'
                                    onClick={() =>{
                                        if(!window.confirm("Are you sure?")) return
                                        handleClick(prescription.prescription_id)
                                    }
                                    }
                                    >
                                        <i class="fa-solid fa-trash"></i>
                                    </td> 
                                </tr>
                    })}
                </tbody>
                 
            </table> 
            <div style={{display: "flex", justifyContent: "end", paddingRight: "10px"}} >
                <button className="submit-btn" 
                onClick={() =>{
                    updatePreStatus(appID);
                    props.setCurrentTable("patient-info");
                    }}
                >Submit</button>
            </div>
                </div>
                </div>
            </div>
        </Zoom>
    );
};

export default AddPrescription;