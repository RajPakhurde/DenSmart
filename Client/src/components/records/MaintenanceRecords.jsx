import React, { useState, useEffect } from "react";
import { Zoom } from '@mui/material';

const MaintenanceRecords = (props) => {
    const [allMaintenanceReocord, setAllMaintenanceRecord] = useState([]);

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
            const response = await fetch(`http://localhost:8080/maintenance-recorddates?startDate=${startDate}&endDate=${endDate}`);
            const jsonDate = await response.json();
    
            setAllMaintenanceRecord(jsonDate);
        } catch (error) {
            console.log(error.message);
        }
    }

    function handleClick(event) {
        props.setCurrentTable(event.target.id);
    }

    var fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - 30); 
    var fromD = fromDate.toISOString().substring(0,10);

    var toDate = new Date();
    toDate.setDate(toDate.getDate());
    var toD = toDate.toISOString().substring(0,10);


    // Get all Maintenance Records
    const getAllMaintenanceRecords = async () => {
        try {
            const response = await fetch("http://localhost:8080/maintenance-record");
            const jsonDate = await response.json();

            setAllMaintenanceRecord(jsonDate);
        } catch (error) {
            console.log(error.message);
        }
    }

     // Search 
     const searchQuery = async (e) => {
        try {
            const response = await fetch("http://localhost:8080/search-maintenance?term="+e.target.value);
            const jsonData = await response.json();

            if (jsonData.length === 0) return getAllMaintenanceRecords()
            setAllMaintenanceRecord(jsonData); 
            
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getAllMaintenanceRecords();
    }, []);

    const handleBtnClick = async (id) => {
        try {
            const deleteMaintenance = await fetch("http://localhost:8080/maintenance-record/"+id, {
                method: "DELETE"
            });

            getAllMaintenanceRecords();
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
                    <input type="date" id="to-date" required onChange={handleEndDateChange} />
                </div>

                <div className="second-div" >
                    <div className="lab-record-searchbar searchbar input-container">
                        <input type="search" name="searchPatients" className="searchLabRecords" placeholder="Maintenance work"
                        onChange={searchQuery}
                        />
                    </div>
                    <div>
                        <button id="new-mantenance-record" className="new-btn-appointment" onClick={handleClick}>+ Add New</button>
                    </div>
                </div>
            </div>
            

            <div class="patient-info">
                <table class="table">
                    <thead>
                       <tr>
                            <th class="table-header" id="sno">SNo</th>
                            <th class="table-header" id="date">Date</th>
                            <th class="table-header" id="maintenancework">Maintenance Work</th>
                            <th class="table-header" id="charges">Charges</th>
                            <th class="table-header" id="action">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allMaintenanceReocord.map((maintenanceRecord) => {
                            const formattedDate = new Date(maintenanceRecord.date).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

                            return <tr key={maintenanceRecord.maintenance_record_id}>
                                        <td>{maintenanceRecord.maintenance_record_id}</td>
                                        <td>{formattedDate.split(',')[0]}</td>
                                        <td>{maintenanceRecord.maintenance_work}</td>
                                        <td>{maintenanceRecord.charges_paid}</td>
                                        <td className='patient-delete-btn'>
                                            {/* <i class="fa-solid fa-pencil"></i> */}
                                            <i class="fa-solid fa-trash"
                                             onClick={() =>{
                                                if(!window.confirm("Are you sure?")) return
                                                handleBtnClick(maintenanceRecord.maintenance_record_id);
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

export default MaintenanceRecords;