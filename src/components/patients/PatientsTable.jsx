import React from "react";

const PatientsTable = () => {
    return (
        <div className="patient-info">
            <div className="searchbar input-container">
                <input type="search" name="searchPatients" className="searchPatients" placeholder=" PID / Name / Mobile No"/>
                <p><i class="fa-solid fa-magnifying-glass"></i></p>
            </div>

            <table className="table">
                <tr>
                    <th className="table-header" id="sno">SNo</th>
                    <th className="table-header" id="patient-name">Patient Name</th>
                    <th className="table-header" id="pid">PID</th>
                    <th className="table-header" id="regdate">Reg. Date</th>
                    <th className="table-header" id="gender">Gender</th>
                    <th className="table-header" id="age">Age</th>
                    <th className="table-header" id="address">Address</th>
                    <th className="table-header" id="mobile">Mobile</th>
                    <th className="table-header" id="email">Email</th>
                    <th className="table-header" id="medicalhistory">Medical History</th>
                    <th className="table-header" id="btnaddnew">
                    <button className="btn-addnew">Add New</button>
                    </th>
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
                    <td>
                    <i class="fa-solid fa-pencil"></i>
                    <i class="fa-solid fa-trash"></i>
                    </td>
                </tr>
            </table>

        </div>
    );
};

export default PatientsTable;
