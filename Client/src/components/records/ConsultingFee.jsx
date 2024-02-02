import React, { useState, useEffect } from "react";

const CunsultingFee = (props) => {
    const [allConsultantingFee, setAllConsultingFee] = useState([]);

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

    useEffect(() => {
        getAllConsultingFee();
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
                        <input type="search" name="searchPatients" className="searchLabRecords" placeholder=" PID / Name / Mobile No"/>
                        <p><i class="fa-solid fa-magnifying-glass"></i></p>
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
                            
                        </tr>
                    </thead>
                    <tbody>
                        {allConsultantingFee.map((consultingfee) => {
                            return <tr>
                                        <td>{sNo++}</td>
                                        <td>{consultingfee.date.split('T')[0]}</td>
                                        <td>{consultingfee.patient_name}</td>
                                        <td>{consultingfee.treatment}</td>
                                        <td>{consultingfee.doctor_name}</td>
                                        <td>{consultingfee.mode_of_payment}</td>
                                        <td>{consultingfee.creadited_amount}</td>
                                        <td>{consultingfee.consultant_amount}</td>
                                    </tr>
                        })}
                    </tbody>
                
                
                </table>
            </div>
        </div> 
    );
};

export default CunsultingFee;