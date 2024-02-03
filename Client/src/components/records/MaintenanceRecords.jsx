import React, { useState, useEffect } from "react";

const MaintenanceRecords = (props) => {
    const [allMaintenanceReocord, setAllMaintenanceRecord] = useState([]);

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
 
    return (
        <div className="sub-tables">
            <div className="upper-div">
                <div className="first-div" >
                    <select name="alldates" id="all-dates" required>
                    <option value="alldates">All Dates</option>
                    </select>
                    <p  >From</p>
                    <input type="date" id="from-date" required defaultValue={fromD}/>
                    <p >To</p>
                    <input type="date" id="to-date" required defaultValue={toD} />
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
                            return <tr key={maintenanceRecord.maintenance_record_id}>
                                {console.log(typeof maintenanceRecord.date)}
                                        <td>{maintenanceRecord.maintenance_record_id}</td>
                                        <td>{maintenanceRecord.date.split('T')[0]}</td>
                                        <td>{maintenanceRecord.maintenance_work}</td>
                                        <td>{maintenanceRecord.charges_paid}</td>
                                        <td>
                                            <i class="fa-solid fa-pencil"></i>
                                            <i class="fa-solid fa-trash"></i>
                                        </td>   
                                    </tr>
                        })}
                    </tbody>
                
                
                
                </table>
            </div>
        </div>
    );
};

export default MaintenanceRecords;