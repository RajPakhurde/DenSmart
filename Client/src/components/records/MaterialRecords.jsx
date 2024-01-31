import React, { useState, useEffect } from "react";

const  MaterialRecords = (props) => {
    const [allMaterialRecords, setAllMaterialRecords] = useState([]);

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

    useEffect(() => {
        getAllMaterialData();
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
                        <input type="search" name="searchPatients" className="searchLabRecords" placeholder=" PID / Name / Mobile No"/>
                        <p><i class="fa-solid fa-magnifying-glass"></i></p>
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
                            <th class="table-header" id="action">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allMaterialRecords.map((materialRecord) => {
                            return <tr>
                                        <td>{materialRecord.material_record_id}</td>
                                        <td>{materialRecord.date.split('T')[0]}</td>
                                        <td>{materialRecord.material_name}</td>
                                        <td>{materialRecord.dealer}</td>
                                        <td>{materialRecord.quantity}</td>
                                        <td>{materialRecord.charges_per_quantity}</td>
                                        <td>{materialRecord.total_charges}</td>
                                        <td>{materialRecord.expiry_date.split('T')[0]}</td>
                                        <td>
                                            <i class="fa-solid fa-pencil"></i> <i class="fa-solid fa-trash"></i>
                                        </td>
                                    </tr>
                        })}
                    </tbody>
                
                
                </table>
            </div>
        </div>
    );
};

export default MaterialRecords;