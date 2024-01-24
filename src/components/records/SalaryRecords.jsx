import React from "react";

const  SalaryRecords = (props) => {
    function handleClick(event) {
        props.setCurrentTable(event.target.id);
    }

    return (
        <div className="sub-tables">
            <div className="upper-div">
                <div className="first-div" >
                    <select name="alldates" id="all-dates" required>
                    <option value="alldates">All Dates</option>
                    </select>
                    <p  >From</p>
                    <input type="date" id="from-date" required />
                    <p >To</p>
                    <input type="date" id="to-date" required />
                </div>

                <div className="second-div" >
                    <div className="lab-record-searchbar searchbar input-container">
                        <input type="search" name="searchPatients" className="searchLabRecords" placeholder=" PID / Name / Mobile No"/>
                        <p><i class="fa-solid fa-magnifying-glass"></i></p>
                    </div>
                    <div>
                        <button id="new-salary-record" className="new-btn-appointment" onClick={handleClick}>+ Add New</button>
                    </div>
                </div>
            </div>
            

            <div class="patient-info">
                <table class="table">
                <tr>
                    <th class="table-header" id="sno">SNo</th>
                    <th class="table-header" id="date">Date</th>
                    <th class="table-header" id="employeename">Employee Name</th>
                    <th class="table-header" id="paidcharges">Paid Charges</th>
                    <th class="table-header" id="action">Action</th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>raj pakhurde</td>
                    <td>fpd</td>
                    <td>ritesh</td>
                    <td>1</td>
                </tr>
                
                </table>
            </div>
        </div> 
    );
};

export default SalaryRecords;