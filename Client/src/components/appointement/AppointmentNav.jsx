import React, { useState } from "react";

const AppointmentNav = (props) => {
    const [bgColor, setBgColor] = useState("all");

    function handleClick(event) {
        props.setCurrentTable(event.target.id);
        props.setHeader("/ " +event.target.id.charAt(0).toUpperCase() + event.target.id.slice(1));
        setBgColor(event.target.id);
    }

    const navItembg = {
        color: "#404048",
        backgroundColor: "#b8b9bc"
    }

    return (
        <div className="appointment-nav-outer">
            <div className="appointment-nav">
                <div className="appointment-nav-item">
                    <div className="appointment-nav-inner">
                        <h3 id="all" style={bgColor === "all" ? navItembg : null} onClick={handleClick}>All</h3>
                        <h3 id="new" style={bgColor === "new" ? navItembg : null} onClick={handleClick} >New</h3>
                        <h3 id="checkin" style={bgColor === "checkin" ? navItembg : null} onClick={handleClick}>Checkin</h3>
                        <h3 id="cancel"  style={bgColor === "cancel" ? navItembg : null} onClick={handleClick} >Cancel</h3>
                        <h3 id="completed"  style={bgColor === "completed" ? navItembg : null} onClick={handleClick}>Completed</h3>
                    </div>

                    <div>
                        <button id="book_Appointment" className="new-btn-appointment" onClick={handleClick}>+ New</button>
                    </div>
                </div>
                <hr />
            </div>
        </div>

    );
};

export default AppointmentNav;