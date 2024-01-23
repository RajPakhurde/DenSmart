import React from 'react';
import { Zoom } from '@mui/material';

const AppointmentCancelTable = () => {
    return (
        <Zoom in={true}>
        <div className='appointment-tables'>
            <table class="table">
                <tr> 
                    <th class="table-header" id="sno">SNo</th>
                    <th class="table-header" id="patient-name">Patient Name</th>
                    <th class="table-header" id="treatment">Treatment</th>
                    <th class="table-header" id="doctors">Doctors</th>
                    <th class="table-header" id="roomno">Room No</th>
                    <th class="table-header" id="intime">In Time</th>
                    <th class="table-header" id="outtime">Out Time</th>
                    <th class="table-header" id="status">Status</th>
                    <th class="table-header" id="controls">Controls</th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>raj pakhurde</td>
                    <td>fpd</td>
                    <td>ritesh </td>
                    <td>1</td>
                    <td>7.00</td>
                    <td>8.00</td>
                    <td>New</td>
                    <td>1</td>
                </tr>
                <tr> 
                    <td>1</td>
                    <td>raj pakhurde</td>
                    <td>fpd</td>
                    <td>ritesh </td>
                    <td>1</td>
                    <td>7.00</td>
                    <td>8.00</td>
                    <td>New</td>
                    <td>1</td>
                </tr>
            </table> 
        </div>
        </Zoom>
    );
};

export default AppointmentCancelTable;