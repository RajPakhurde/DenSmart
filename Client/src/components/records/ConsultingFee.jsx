import React, { useState, useEffect } from "react";
import { Zoom } from '@mui/material';

const CunsultingFee = (props) => {
    const [allConsultantingFee, setAllConsultingFee] = useState([]);

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
            const response = await fetch(`http://localhost:8080/consultingfeedates?startDate=${startDate}&endDate=${endDate}`);
            const jsonDate = await response.json();
    
            setAllConsultingFee(jsonDate);
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

    // Get all ConsultingFee Records
    const getAllConsultingFee = async () => {
        try {
            const response = await fetch("http://localhost:8080/consultingfee");
            const jsonDate = await response.json();

            setAllConsultingFee(jsonDate);
        } catch (error) {
            console.log(error.message);
        }
    }

     // Search 
     const searchQuery = async (e) => {
        try {
            const response = await fetch("http://localhost:8080/search-consultingfee?term="+e.target.value);
            const jsonData = await response.json();

            if (jsonData.length === 0) return getAllConsultingFee()
            setAllConsultingFee(jsonData); 
            
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getAllConsultingFee();
    }, []);

    const handleBtnClick = async (id) => {
        try {
            const deleteconsultingfee = await fetch("http://localhost:8080/consultingfee/"+id, {
                method: "DELETE"
            });

            getAllConsultingFee();
        } catch (error) {
            console.log(error.message);
        } 
    }

    let sNo = 1;
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
                        <input type="search" name="searchPatients" className="searchLabRecords" placeholder=" Patient name "
                        onChange={searchQuery}
                        />
                    </div>
                    <div>
                        <button id="new-consultingfee-record" className="new-btn-appointment" onClick={handleClick}>+ Add New</button>
                    </div>
                </div>
            </div>
            

            <div class="patient-info">
                <table class="table">
                    <thead>
                        <tr>
                            <th class="table-header" id="sno">SNo</th>
                            <th class="table-header" id="date">Date</th>
                            <th class="table-header" id="patient-name">Patient Name</th>
                            <th class="table-header" id="mobile">Treatment Name</th>
                            <th class="table-header" id="labwork">Doctor Name</th>
                            <th class="table-header" id="labname">Mode of Payment</th>
                            <th class="table-header" id="impressiondate">Credited Amount</th>
                            <th class="table-header" id="senddate">Consultatnt Amount</th>
                            <th class="table-header" id="senddate">Controls</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {allConsultantingFee.map((consultingfee) => {
                            const formattedDate = new Date(consultingfee.date).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

                            return <tr>
                                        <td>{sNo++}</td>
                                        <td>{formattedDate.split(',')[0]}</td>
                                        <td>{consultingfee.patient_name}</td>
                                        <td>{consultingfee.treatment}</td>
                                        <td>{consultingfee.doctor_name}</td>
                                        <td>{consultingfee.mode_of_payment}</td>
                                        <td>{consultingfee.creadited_amount}</td>
                                        <td>{consultingfee.consultant_amount}</td>
                                        <td className='patient-delete-btn'>
                                            {/* <i class="fa-solid fa-pencil"></i> */}
                                            <i class="fa-solid fa-trash"
                                             onClick={() =>{
                                                if(!window.confirm("Are you sure?")) return
                                                handleBtnClick(consultingfee.consulting_fee_id);
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

export default CunsultingFee;