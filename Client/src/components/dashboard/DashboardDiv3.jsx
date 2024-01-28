import React from 'react';
import Zoom from '@mui/material/Zoom';
import DashboardHospitalInfo from './DashboardHospitalInfo';

const DashboardDiv3 = () => {
    return (
      <Zoom in={true} >
        <div className='div-3'>
        <div className="dashboard-div-3 table-card table-card-1">
            <div className="treatment-info-header">
              <p>All Patients</p>
            </div>
            <hr />
            <table>
              <tr className='table-tr'>
                <th className='treatment-col'>Treatments</th>
                <th>Today</th>
                <th>This Month</th>
                <th>Last Month</th>
                <th>This Year</th>
                <th>Last Year</th>
              </tr>
              <tr className='table-tr'>
                <td>Complete Denture</td>
                <td className="treatment-table-data">0</td>
                <td className="treatment-table-data">0</td>
                <td className="treatment-table-data">0</td>
                <td className="treatment-table-data">0</td>
                <td className="treatment-table-data">0</td>
              </tr>
              <tr className='table-tr'>
                <td>Composite Restoration</td>
                <td className="treatment-table-data">0</td>
                <td className="treatment-table-data">0</td>
                <td className="treatment-table-data">0</td>
                <td className="treatment-table-data">0</td>
                <td className="treatment-table-data">0</td>
              </tr>
              <tr className='table-tr'>
                <td>Consultation</td>
                <td className="treatment-table-data">0</td>
                <td className="treatment-table-data">0</td>
                <td className="treatment-table-data">0</td>
                <td className="treatment-table-data">0</td>
                <td className="treatment-table-data">0</td>
              </tr>
              <tr className='table-tr'>
                <td>Crown</td>
                <td className="treatment-table-data">0</td>
                <td className="treatment-table-data">0</td>
                <td className="treatment-table-data">0</td>
                <td className="treatment-table-data">0</td>
                <td className="treatment-table-data">0</td>
              </tr>
              <tr className='table-tr'>
                <td>Extraction</td>
                <td className="treatment-table-data">0</td>
                <td className="treatment-table-data">0</td>
                <td className="treatment-table-data">0</td>
                <td className="treatment-table-data">0</td>
                <td className="treatment-table-data">0</td>
              </tr>
              <tr className='table-tr'>
                <td>FPD</td>
                <td className="treatment-table-data">0</td>
                <td className="treatment-table-data">0</td>
                <td className="treatment-table-data">0</td>
                <td className="treatment-table-data">0</td>
                <td className="treatment-table-data">0</td>
              </tr>
              <tr className='table-tr'>
                <td>Implant</td>
                <td className="treatment-table-data">0</td>
                <td className="treatment-table-data">0</td>
                <td className="treatment-table-data">0</td>
                <td className="treatment-table-data">0</td>
                <td className="treatment-table-data">0</td>
              </tr>
              <tr className='table-tr'>
                <td>Orthodontic Treatment</td>
                <td className="treatment-table-data">0</td>
                <td className="treatment-table-data">0</td>
                <td className="treatment-table-data">0</td>
                <td className="treatment-table-data">0</td>
                <td className="treatment-table-data">0</td>
              </tr>
              <tr className='table-tr'>
                <td>Root Canal Treatment</td>
                <td className="treatment-table-data">0</td>
                <td className="treatment-table-data">0</td>
                <td className="treatment-table-data">0</td>
                <td className="treatment-table-data">0</td>
                <td className="treatment-table-data">0</td>
              </tr>
            </table>
          </div>
          <DashboardHospitalInfo />
          
          </div>
          </Zoom>    
    );
};

export default DashboardDiv3;