import React from "react";

const StockHistory = (props) => {
    return (
        <div class="popup-record sub-tables">
            <div className="lab-record-form">

            
            <div className="form-header">
                <div className="form-heading">Save Stock Records</div>
                <div className="close-btn" onClick={() =>{
                    props.setCurrentTable("stockhistory");
                    }}  >&times;</div>
            </div>
            <hr />

            <form className="form" >
                <div className="first-row-lab-records ">
                    <div className="form-element input-container">
                        <input type="text" id="material-name" required />
                        <label>Material Name</label> 
                    </div>
                    <div className="form-element input-container">
                        <input type="number" id="total-stock" required />
                        <label>Total Stock</label> 
                    </div>
                    <div className="form-element input-container">
                        <input type="number" id="used-stock" required />
                        <label>Used Stock</label> 
                    </div>
                </div>
                <div className="second-row-lab-records ">
                <div className="form-element input-container">
                        <input type="number" id="bal-stock" required />
                        <label>Bal Stock</label> 
                    </div>
                    <div className="dates">
                        <label for="expiry-date">Expiry Date</label>
                        <input type="date" id="expiry-date" required />
                    </div>
                </div>    

                <hr />

                <div id="form-row-5" className="form-row form-row-5">
                    <button type="submit" className="submit-btn">Save</button>
                    <button type="reset" className="reset-btn">Reset</button>
                </div>
            </form>
            </div>
    </div>
    );
};

export default StockHistory;