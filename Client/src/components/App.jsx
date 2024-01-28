import React, { useState } from 'react';
import Nav from './navbar/Nav';
import Header from './Header';
import Dashboard from './Dashboard';
import Appointment from './Appointement';
import Patients from './Patients';
import Planner from './Planner';
import Records from './Records';
import Accounts from './Accounts'


const App = () => {
    const [currentComp, setCurrentComp] = useState("dashboard");   
    
    const [currentPage, setCurrentPage] = useState("Dashboard");

    const [iconHeader, setIconHeader] = useState(<i class="ri-home-7-fill"></i>);

    const [header, setHeader] = useState("/ All");

    const icons = [
        <i class="ri-home-7-fill"></i>, 
        <i class="ri-calendar-2-line"></i>,
        <i class="ri-user-3-fill"></i>,
        <i class="ri-time-fill"></i>,
        <i class="ri-file-history-fill"></i>,
        <i class="ri-money-rupee-circle-fill"></i>
        ];

    function setCurrentCompnent (id) {
        switch (id) {
            case "1":
                setCurrentComp("dashboard");
                setCurrentPage("Dashboard");
                setIconHeader(icons[0]);
                break;
            case "2":
                setCurrentComp("appointment")
                setCurrentPage("Appointment");
                setIconHeader(icons[1]);
                break;
            case "3":
                setCurrentComp("patients");
                setCurrentPage("Patients");
                setIconHeader(icons[2]);
                break;
            case "4":
                setCurrentComp("planner");
                setCurrentPage("Planner");
                setIconHeader(icons[3]);
                break;
            case "5":
                setCurrentComp("records");
                setCurrentPage("Records");
                setIconHeader(icons[4]);
                break;
            case "6": 
                setCurrentComp("accounts");
                setCurrentPage("Accounts");
                setIconHeader(icons[5]);
                break;               
            default:
                console.log("error");
                break;
        }
    }

    return (
        <div>
            
            <Nav setCurrentCompnent={setCurrentCompnent} subHeader={setHeader} />
            <Header page={currentPage} icon={iconHeader} subHeader={header}/>
            {currentComp === "dashboard" && <Dashboard /> }
            {currentComp === "appointment" && <Appointment setHeader={setHeader} /> }
            {currentComp === "patients" && <Patients /> }
            {currentComp === "planner" && <Planner /> }
            {currentComp === "records" && <Records setHeader={setHeader} /> }
            {currentComp === "accounts" && <Accounts /> }
            {console.log(header)} 
           
        </div>
    );
};

export default App;