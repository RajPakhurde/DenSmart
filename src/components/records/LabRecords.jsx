import React from "react";

const  LabRecords = (props) => {
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
                        <button id="new-lab-record" className="new-btn-appointment" onClick={handleClick}>+ Add New</button>
                    </div>
                </div>
            </div>
            

            <div class="patient-info">
                <table class="table">
                <tr>
                    <th class="table-header" id="sno">SNo</th>
                    <th class="table-header" id="patient-name">Patient Name</th>
                    <th class="table-header" id="mobile">Mobile</th>
                    <th class="table-header" id="labwork">Lab Work</th>
                    <th class="table-header" id="labname">Lab Name</th>
                    <th class="table-header" id="impressiondate">ImpressionDate</th>
                    <th class="table-header" id="senddate">SendDate</th>
                    <th class="table-header" id="receiveddate">ReceivedDate</th>
                    <th class="table-header" id="insertiondate">InsertionDate</th>
                    <th class="table-header" id="labcharges">Lab Charges</th>
                    <th class="table-header" id="action">Action</th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>raj pakhurde</td>
                    <td>fpd</td>
                    <td>ritesh</td>
                    <td>1</td>
                    <td>7.00</td>
                    <td>8.00</td>
                    <td>New</td>
                    <td>1</td>
                    <td>dfdfdfd</td>
                    <td>...</td>
                </tr>
                
                </table>
            </div>
        </div> 
    );
};

export default LabRecords; 