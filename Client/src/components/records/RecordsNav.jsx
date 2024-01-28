import React from "react";

const RecordsNav = (props) => {

    function handleClick(event) {
        props.setCurrentTable(event.target.id);
        props.setHeader("/ " +event.target.id.charAt(0).toUpperCase() + event.target.id.slice(1));
    }
    


    return (
        <div className="appointment-nav-outer">
            <div className="appointment-nav">
                <div className="appointment-nav-item">
                    <div className="appointment-nav-inner">
                        <h3 id="labrecords" onClick={handleClick}>Lab <br /> Records</h3>
                        <h3 id="materialrecords" onClick={handleClick} >Material <br /> Records</h3>
                        <h3 id="maintenancerecords" onClick={handleClick}>Maintenance <br /> Records</h3>
                        <h3 id="salaryrecords" onClick={handleClick} >Salary <br /> Records</h3>
                        <h3 id="consumematerial" onClick={handleClick}>Consume <br /> Material</h3>
                        <h3 id="stockhistory" onClick={handleClick}>Stock <br /> History</h3>
                        <h3 id="consultingfee" onClick={handleClick}>Consulting <br /> Fee</h3>
                    </div>

                </div>
                <hr />
            </div>
        </div>

    );
};

export default RecordsNav;