import React from "react";

const AppointmentNav = (props) => {

    function handleClick(event) {
        props.setCurrentTable(event.target.id);
        props.setHeader("/ " +event.target.id.charAt(0).toUpperCase() + event.target.id.slice(1));
    }


    return (
        <div className="appointment-nav-outer">
            <div className="appointment-nav">
                <div className="appointment-nav-item">
                    <div className="appointment-nav-inner">
                        <h3 id="all" onClick={handleClick}>All</h3>
                        <h3 id="new" onClick={handleClick} >New</h3>
                        <h3 id="checkin" onClick={handleClick}>Checkin</h3>
                        <h3 id="cancel" onClick={handleClick} >Cancel</h3>
                        <h3 id="completed" onClick={handleClick}>Completed</h3>
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