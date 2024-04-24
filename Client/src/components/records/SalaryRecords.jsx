import React, { useState, useEffect } from "react";
import { Zoom } from '@mui/material';

const  SalaryRecords = (props) => {
    const [allSalaryRecord, setAllSalaryRecord] = useState([]);

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
            const response = await fetch(`http://localhost:8080/salarydates?startDate=${startDate}&endDate=${endDate}`);
            const jsonDate = await response.json();
    
            setAllSalaryRecord(jsonDate);
        } catch (error) {
            console.log(error.message);
        }
    }

    // GET ALL SALARY RECORDS
    const getAllSalaryRecords = async () => {
        try {
            const response = await fetch("http://localhost:8080/salary");
            const jsonDate = await response.json();

            setAllSalaryRecord(jsonDate);

        } catch (error) {
            console.log(error.message);
        }
    }

     // Search 
     const searchQuery = async (e) => {
        try {
            const response = await fetch("http://localhost:8080/search-salary?term="+e.target.value);
            const jsonData = await response.json();

            if (jsonData.length === 0) return getAllSalaryRecords()
            setAllSalaryRecord(jsonData); 
            
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getAllSalaryRecords();
    }, []);

    const handleBtnClick = async (id) => {
        try {
            const deletelab = await fetch("http://localhost:8080/salary/"+id, {
                method: "DELETE"
            });

            getAllSalaryRecords();
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
                    <input type="date" id="to-date" required onChange={handleEndDateChange}/>
                </div>

                <div className="second-div" >
                    <div className="lab-record-searchbar searchbar input-container">
                        <input type="search" name="searchPatients" className="searchLabRecords" placeholder="Employer name "
                        onChange={searchQuery}
                        />
                       
                    </div>
                    <div>
                        <button id="new-salary-record" className="new-btn-appointment" onClick={handleClick}>+ Add New</button>
                    </div>
                </div>
            </div>
            

            <div class="patient-info">
                <table class="table">
                    <thead>
                        <tr>
                            <th class="table-header" id="sno">SNo</th>
                            <th class="table-header" id="date">Date</th>
                            <th class="table-header" id="employeename">Employer Name</th>
                            <th class="table-header" id="paidcharges">Paid Charges</th>
                            <th class="table-header" id="action">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allSalaryRecord.map((salaryRecord) => {
                            const formattedDate = new Date(salaryRecord.date).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

                            return <tr>
                                        <td>{salaryRecord.salary_record_id}</td>
                                        <td>{formattedDate.split(',')[0]}</td>
                                        <td>{salaryRecord.employee_name}</td>
                                        <td>{salaryRecord.salary_paid}</td>
                                        <td className='patient-delete-btn'>
                                            {/* <i class="fa-solid fa-pencil"></i> */}
                                            <i class="fa-solid fa-trash"
                                             onClick={() =>{
                                                if(!window.confirm("Are you sure?")) return
                                                handleBtnClick(salaryRecord.salary_record_id);
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

export default SalaryRecords;