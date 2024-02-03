import React, { useState, useEffect } from 'react';
import Zoom from '@mui/material/Zoom';
import DashboardHospitalInfo from './DashboardHospitalInfo';

const DashboardDiv3 = () => {
    const [dashboardData, setDashboardData] = useState([]);
    const  getDashboardData = async () => {
        try {
            const response = await fetch("http://localhost:8080/dashboard");
            const jsonData = await response.json();
            setDashboardData(jsonData);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getDashboardData();
    },[])

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
                <td className="treatment-table-data">{dashboardData.completeDentureToday}</td>
                <td className="treatment-table-data">{dashboardData.completeDentureThisMonth}</td>
                <td className="treatment-table-data">{dashboardData.completeDentureLastMonth}</td>
                <td className="treatment-table-data">{dashboardData.completeDentureThisYear}</td>
                <td className="treatment-table-data">{dashboardData.completeDentureLastYear}</td>
              </tr>
              <tr className='table-tr'>
                <td>Composite Restoration</td>
                <td className="treatment-table-data">{dashboardData.compositeRestorationToday}</td>
                <td className="treatment-table-data">{dashboardData.compositeRestorationThisMonth}</td>
                <td className="treatment-table-data">{dashboardData.compositeRestorationLastMonth}</td>
                <td className="treatment-table-data">{dashboardData.compositeRestorationThisYear}</td>
                <td className="treatment-table-data">{dashboardData.compositeRestorationLastYear}</td>
              </tr>
              <tr className='table-tr'>
                <td>Consultation</td>
              <td className="treatment-table-data">{dashboardData.consultationToday}</td>
              <td className="treatment-table-data">{dashboardData.consultationThisMonth}</td>
              <td className="treatment-table-data">{dashboardData.consultationLastMonth}</td>
              <td className="treatment-table-data">{dashboardData.consultationThisYear}</td>
              <td className="treatment-table-data">{dashboardData.consultationLastYear}</td>
              </tr>
              <tr className='table-tr'>
                <td>Crown</td>
                <td className="treatment-table-data">{dashboardData.crownToday}</td>
                <td className="treatment-table-data">{dashboardData.crownThisMonth}</td>
                <td className="treatment-table-data">{dashboardData.crownLastMonth}</td>
                <td className="treatment-table-data">{dashboardData.crownThisYear}</td>
                <td className="treatment-table-data">{dashboardData.crownLastYear}</td>
              </tr>
              <tr className='table-tr'>
                <td>Extraction</td>
                <td className="treatment-table-data">{dashboardData.extractionToday}</td>
                <td className="treatment-table-data">{dashboardData.extractionThisMonth}</td>
                <td className="treatment-table-data">{dashboardData.extractionLastMonth}</td>
                <td className="treatment-table-data">{dashboardData.extractionThisYear}</td>
                <td className="treatment-table-data">{dashboardData.extractionLastYear}</td>
              </tr>
              <tr className='table-tr'>
                <td>FPD</td>
                <td className="treatment-table-data">{dashboardData.fpdToday}</td>
                <td className="treatment-table-data">{dashboardData.fpdThisMonth}</td>
                <td className="treatment-table-data">{dashboardData.fpdLastMonth}</td>
                <td className="treatment-table-data">{dashboardData.fpdThisYear}</td>
                <td className="treatment-table-data">{dashboardData.fpdLastYear}</td>
              </tr>
              <tr className='table-tr'>
                <td>Implant</td>
                <td className="treatment-table-data">{dashboardData.implantToday}</td>
                <td className="treatment-table-data">{dashboardData.implantThisMonth}</td>
                <td className="treatment-table-data">{dashboardData.implantLastMonth}</td>
                <td className="treatment-table-data">{dashboardData.implantThisYear}</td>
                <td className="treatment-table-data">{dashboardData.implantLastYear}</td>
              </tr>
              <tr className='table-tr'>
                <td>Orthodontic Treatment</td>
                <td className="treatment-table-data">{dashboardData.orthodonticToday}</td>
                <td className="treatment-table-data">{dashboardData.orthodonticThisMonth}</td>
                <td className="treatment-table-data">{dashboardData.orthodonticLastMonth}</td>
                <td className="treatment-table-data">{dashboardData.orthodonticThisYear}</td>
                <td className="treatment-table-data">{dashboardData.orthodonticLastYear}</td>
              </tr>
              <tr className='table-tr'>
                <td>Root Canal Treatment</td>
                <td className="treatment-table-data">{dashboardData.rootToday}</td>
                <td className="treatment-table-data">{dashboardData.rootThisMonth}</td>
                <td className="treatment-table-data">{dashboardData.rootLastMonth}</td>
                <td className="treatment-table-data">{dashboardData.rootThisYear}</td>
                <td className="treatment-table-data">{dashboardData.rootLastYear}</td>
              </tr>
            </table>
          </div>
          <DashboardHospitalInfo />
          
          </div>
          </Zoom>    
    );
};

export default DashboardDiv3;