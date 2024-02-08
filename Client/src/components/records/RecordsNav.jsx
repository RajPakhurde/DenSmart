import React, { useState } from "react";
import { Zoom } from '@mui/material';

const RecordsNav = (props) => {
    const [bgColor, setBgColor] = useState("labrecords");

    function handleClick(event) {
        props.setCurrentTable(event.target.id);
        props.setHeader("/ " +event.target.id.charAt(0).toUpperCase() + event.target.id.slice(1));
        setBgColor(event.target.id);
    }
    
    const navItembg = {
        color: "#404048",
        borderRadius: "0px",
        border: "none",
        borderBottom: "5px solid #0099ff"
    }


    return (
        <div className="appointment-nav-outer">
            <div className="appointment-nav">
                <div className="appointment-nav-item">
                    <div className="appointment-nav-inner">
                        <h3 id="labrecords" style={bgColor === "labrecords" ? navItembg : null} onClick={handleClick}>Lab <br /> Records</h3>
                        <h3 id="materialrecords" style={bgColor === "materialrecords" ? navItembg : null} onClick={handleClick} >Material <br /> Records</h3>
                        <h3 id="maintenancerecords" style={bgColor === "maintenancerecords" ? navItembg : null} onClick={handleClick}>Maintenance <br /> Records</h3>
                        <h3 id="salaryrecords" style={bgColor === "salaryrecords" ? navItembg : null} onClick={handleClick} >Salary <br /> Records</h3>
                        <h3 id="consumematerial" style={bgColor === "consumematerial" ? navItembg : null} onClick={handleClick}>Consume <br /> Material</h3>
                        <h3 id="stockhistory" style={bgColor === "stockhistory" ? navItembg : null} onClick={handleClick}>Stock <br /> History</h3>
                        <h3 id="consultingfee" style={bgColor === "consultingfee" ? navItembg : null} onClick={handleClick}>Consulting <br /> Fee</h3>
                    </div>

                </div>
                <hr />
            </div>
        </div>

    );
};

export default RecordsNav;