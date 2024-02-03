import React,  { useState, useEffect } from "react";

const  LabRecords = (props) => {
    const [allLabRecords, setAllLabRecords] = useState([]);

    function handleClick(event) {
        props.setCurrentTable(event.target.id);
    }

    var fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - 30);
    var fromD = fromDate.toISOString().substring(0,10);

    var toDate = new Date();
    toDate.setDate(toDate.getDate());
    var toD = toDate.toISOString().substring(0,10);

     // Get all Lab Records
     const getAllLabRecords = async () => {
        try {
            const response = await fetch("http://localhost:8080/lab");
            const jsonDate = await response.json();

            setAllLabRecords(jsonDate);
        } catch (error) {
            console.log(error.message);
        }
    }

    // Search 
    const searchQuery = async (e) => {
        try {
            const response = await fetch("http://localhost:8080/search-lab?term="+e.target.value);
            const jsonData = await response.json();

            if (jsonData.length === 0) return getAllLabRecords()
            setAllLabRecords(jsonData); 
            
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getAllLabRecords();
    }, []);

    let sNo = 1;

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
                        <input type="search" name="searchPatients" className="searchLabRecords" placeholder=" Patient name / lab name / Mobile No"
                        onChange={searchQuery}
                        />
                    </div>
                    <div>
                        <button id="new-lab-record" className="new-btn-appointment" onClick={handleClick}>+ Add New</button>
                    </div>
                </div>
            </div>
            

            <div class="patient-info">
                <table class="table">
                    <thead>
                        <tr>
                            <th class="table-header" id="sno">SNo</th>
                            <th class="table-header" id="patient-name">Patient Name</th>
                            <th class="table-header" id="mobile">Mobile</th>
                            <th class="table-header" id="labwork">Lab Work</th>
                            <th class="table-header" id="labname">Lab Name</th>
                            <th class="table-header" id="impressiondate">ImpressionDate</th>
                            <th class="table-header" id="senddate">SendDate</th>
                            <th class="table-header" id="receiveddate">RecivedDate</th>
                            <th class="table-header" id="insertiondate">InsertionDate</th>
                            <th class="table-header" id="labcharges">Lab Charges</th>
                            <th class="table-header" id="action">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allLabRecords.map((labRecord) => {
                            return <tr>
                                        <td>{sNo++}</td>
                                        <td>{labRecord.patient_name}</td>
                                        <td>{labRecord.mobile}</td>
                                        <td>{labRecord.lab_work}</td>
                                        <td>{labRecord.lab_name}</td>
                                        <td>{labRecord.impression_date.split('T')[0]}</td>
                                        <td>{labRecord.send_date.split('T')[0]}</td>
                                        <td>{labRecord.recive_date.split('T')[0]}</td>
                                        <td>{labRecord.insertion_date.split('T')[0]}</td>
                                        <td>{labRecord.lab_charges}</td>
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

export default LabRecords; 