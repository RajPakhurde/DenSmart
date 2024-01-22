import React from "react";

const AppointmentNav = () => {
    return (
        <div className="appointment-nav-outer">
            <div className="appointment-nav">
                <div className="appointment-nav-item">
                    <div className="appointment-nav-inner">
                        <h3>All</h3>
                        <h3>New</h3>
                        <h3>Checkin</h3>
                        <h3>Cancel</h3>
                        <h3>Completed</h3>
                    </div>

                    <div>
                        <button className="new-btn-appointment">+ New</button>
                    </div>
                </div>
                <hr />
            </div>
        </div>

    );
};

export default AppointmentNav;