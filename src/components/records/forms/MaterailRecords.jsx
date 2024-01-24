import React from "react";

const MaterialRecords = (props) => {
    return (
        <div class="popup-record sub-tables">
            <div className="lab-record-form">

            
            <div className="form-header">
                <div className="form-heading">Save Material Records</div>
                <div className="close-btn" onClick={() =>{
                    props.setCurrentTable("materialrecords");
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
                        <input type="number" id="charges" required />
                        <label>Charges / Quantity</label> 
                    </div>
                    <div className="form-element input-container">
                        <input type="number" id="total-charges" required />
                        <label>Total Charges</label> 
                    </div>
                    <div className="form-element input-container">
                        <input type="number" id="quantity" required />
                        <label>Quantity</label> 
                    </div>
                </div>
                <div className="second-row-lab-records ">
                    <div className="dates form-element">
                        <label for="date">Date</label>
                        <input type="date" id="date" required />
                    </div>
                    <div className="dates form-element">
                        <label for="expiry-date">Expiry Date</label>
                        <input type="date" id="expiry-date" required />
                    </div>
                    <div>
                    <select name="dealer-name" id="form-dealer-name" required>
                        <option value="default">--Dealer--</option>
                        <option value="amit enterprises">Amit Enterprises</option>
                    </select>
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

export default MaterialRecords;