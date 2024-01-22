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

    function setCurrentCompnent (id) {
        switch (id) {
            case "1":
                setCurrentComp("dashboard")
                break;
            case "2":
                setCurrentComp("appointment")
                break;
            case "3":
                setCurrentComp("patients");
                break;
            case "4":
                setCurrentComp("planner");
                break;
            case "5":
                setCurrentComp("records");
                break;
            case "6": 
                setCurrentComp("accounts");
                break;               
            default:
                console.log("error");
                break;
        }
    }

    return (
        <div>
            <Nav setCurrentCompnent={setCurrentCompnent} />
            <Header />
            {currentComp === "dashboard" && <Dashboard /> }
            {currentComp === "appointment" && <Appointment /> }
            {currentComp === "patients" && <Patients /> }
            {currentComp === "planner" && <Planner /> }
            {currentComp === "records" && <Records /> }
            {currentComp === "accounts" && <Accounts /> }
        </div>
    );
};

export default App;