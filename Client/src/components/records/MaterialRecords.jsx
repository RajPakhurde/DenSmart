import React, { useState, useEffect } from "react";
import { Zoom } from '@mui/material';

const  MaterialRecords = (props) => {
    const [allMaterialRecords, setAllMaterialRecords] = useState([]);

    var startDate = "";
    var endDate = "";

    function handleClick(event) {
        props.setCurrentTable(event.target.id);
    }

    const handleStartDateChange = (event) => {  
        startDate = event.target.value; 
        getAllRecordsDates(); 
    };

    const handleEndDateChange = (event) => {  
        endDate = event.target.value;
        getAllRecordsDates();
    };

    const getAllRecordsDates = async () => {
        try {
            const response = await fetch(`http://localhost:8080/material-recorddates?startDate=${startDate}&endDate=${endDate}`);
            const jsonDate = await response.json();
    
            setAllMaterialRecords(jsonDate);
        } catch (error) {
            console.log(error.message);
        }
    }

    // To change the current component
    function handleClick(event) {
        props.setCurrentTable(event.target.id);
    }

    var fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - 30);
    var fromD = fromDate.toISOString().substring(0,10);

    var toDate = new Date();
    toDate.setDate(toDate.getDate());
    var toD = toDate.toISOString().substring(0,10);

    // Get all material data 
    const getAllMaterialData = async () => {
        try {
            const response = await fetch("http://localhost:8080/material-record");
            const jsonData = await response.json();

            setAllMaterialRecords(jsonData);
        } catch (error) {
            console.log(error.message);
        }
    }

     // Search 
     const searchQuery = async (e) => {
        try {
            const response = await fetch("http://localhost:8080/search-material?term="+e.target.value);
            const jsonData = await response.json();

            if (jsonData.length === 0) return getAllMaterialData()
            setAllMaterialRecords(jsonData); 
            
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getAllMaterialData();
    }, []);

    const handleBtnClick = async (id) => {
        try {
            const deleteMaterial = await fetch("http://localhost:8080/material-record/"+id, {
                method: "DELETE"
            });

            getAllMaterialData();
        } catch (error) {
            console.log(error.message);
        } 
    }

    return (
        <Zoom in={true}> 
        <div className="sub-tables">
            <div className="upper-div">
                <div className="first-div" >
                    <select name="alldates" id="all-dates" required>
                    <option value="alldates">All Dates</option>
                    </select>
                    <p  >From</p>
                    <input type="date" id="from-date" required onChange={handleStartDateChange}/>
                    <p >To</p>
                    <input type="date" id="to-date" required  onChange={handleEndDateChange} />
                </div>

                <div className="second-div" >
                    <div className="lab-record-searchbar searchbar input-container">
                        <input type="search" name="searchPatients" className="searchLabRecords" placeholder="Material name / Dealer name"
                        onChange={searchQuery}
                        />
                        
                    </div>
                    <div>
                        <button id="new-material-record" className="new-btn-appointment" onClick={handleClick}>+ Add New</button>
                    </div>
                </div>
            </div>
            

            <div class="patient-info">
                <table class="table">
                    <thead>
                        <tr>
                            <th class="table-header" id="sno">SNo</th>
                            <th class="table-header" id="date">Date</th>
                            <th class="table-header" id="materialname">Material Name</th>
                            <th class="table-header" id="dealername">Dealer Name</th>
                            <th class="table-header" id="doses">Doses</th>
                            <th class="table-header" id="chargesperdoses">Charges Per Doses</th>
                            <th class="table-header" id="totalcharges">Total Charges</th>
                            <th class="table-header" id="expirydate">ExpiryDate</th> 
                            <th class="table-header" id="action">Controls</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allMaterialRecords.map((materialRecord) => {
                            const formattedDate = new Date(materialRecord.date).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

                            return <tr>
                                        <td>{materialRecord.material_record_id}</td>
                                        <td>{formattedDate.split(',')[0]}</td>
                                        <td>{materialRecord.material_name}</td>
                                        <td>{materialRecord.dealer}</td>
                                        <td>{materialRecord.quantity}</td>
                                        <td>{materialRecord.charges_per_quantity}</td>
                                        <td>{materialRecord.total_charges}</td>
                                        <td>{materialRecord.expiry_date.split('T')[0]}</td>
                                        <td className='patient-delete-btn'>
                                            {/* <i class="fa-solid fa-pencil"></i> */}
                                            <i class="fa-solid fa-trash"
                                             onClick={() =>{
                                                if(!window.confirm("Are you sure?")) return
                                                handleBtnClick(materialRecord.material_record_id);
                                            }
                                            }
                                            ></i>
                                        </td>
                                    </tr>
                        })}
                    </tbody>
                
                
                </table>
            </div>
        </div>
        </Zoom>
    );
};

export default MaterialRecords;