 import React, { useState } from "react";

const MaterialRecords = (props) => {
    const [date, setDate] = useState("");
    const [materialName, setMaterialName] = useState("");
    const [dealerName, setDealerName] = useState("");
    const [quantity, setQuantity ] = useState();
    const [chargesPerQuantity, setChargesPerQuantity] = useState();
    const [totalCharges, setTotalCharges] = useState();
    const [expiryDate, setExpiryDate] = useState("");

    // Add data in material table
    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = {date, materialName, dealerName, quantity, chargesPerQuantity, totalCharges, expiryDate};
            const response = await fetch("http://localhost:8080/material-record", {
                method: "POST",
                headers: {"content-type": "application/json"},
                body: JSON.stringify(body)
            }) 

            alert("New Material Record Added!");
        } catch (error) {
            console.log(error.message);
        }
    }
 

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

            <form className="form" onSubmit={onSubmitForm}>
                <div className="first-row-lab-records ">
                    <div className="form-element input-container">
                        <input type="text" id="material-name" required onChange={e => setMaterialName(e.target.value)} />
                        <label>Material Name</label> 
                    </div>
                    <div className="form-element input-container">
                        <input type="number" id="charges" required onChange={e => setChargesPerQuantity(e.target.value)} />
                        <label>Charges / Quantity</label> 
                    </div>
                    <div className="form-element input-container">
                        <input type="number" id="total-charges" required onChange={e => setTotalCharges(e.target.value)} />
                        <label>Total Charges</label> 
                    </div>
                    <div className="form-element input-container">
                        <input type="number" id="quantity" required onChange={e => setQuantity(e.target.value)} />
                        <label>Quantity</label> 
                    </div>
                </div>
                <div className="second-row-lab-records ">
                    <div className="dates form-element">
                        <label for="date">Date</label>
                        <input type="date" id="date" required onChange={e => setDate(e.target.value)} />
                    </div>
                    <div className="dates form-element">
                        <label for="expiry-date">Expiry Date</label>
                        <input type="date" id="expiry-date" required onChange={e => setExpiryDate(e.target.value)} />
                    </div>
                    <div>
                    <select name="dealer-name" id="form-dealer-name" required onChange={e => setDealerName(e.target.value)}  >
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