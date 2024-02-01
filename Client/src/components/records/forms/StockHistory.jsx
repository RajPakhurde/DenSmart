import React, { useState } from "react";

const StockHistory = (props) => {
    const [materialName, setMaterialName] = useState("")
    const [totalStock, setTotalStock] = useState()
    const [usedStock, setUsedStock] = useState()
    const [balStock, setbBalStock] = useState()
    const [expiryDate, setExpiryDate] = useState("")

    // Add data in stock history table
    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = {materialName, totalStock, usedStock, balStock, expiryDate};
            const response = await fetch("http://localhost:8080/stock", {
                method: "POST",
                headers: {"content-type": "application/json"},
                body: JSON.stringify(body)
            })

            alert("New Stock Added Successfully!");
        } catch (error) {
            console.log(error.message); 
        }
    }


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

            <form className="form" onSubmit={onSubmitForm} >
                <div className="first-row-lab-records ">
                    <div className="form-element input-container">
                        <input type="text" id="material-name" required onChange={e => setMaterialName(e.target.value)} />
                        <label>Material Name</label> 
                    </div>
                    <div className="form-element input-container">
                        <input type="number" id="total-stock" required onChange={e => setTotalStock(e.target.value)} />
                        <label>Total Stock</label> 
                    </div>
                    <div className="form-element input-container">
                        <input type="number" id="used-stock" required onChange={e => setUsedStock(e.target.value)} />
                        <label>Used Stock</label> 
                    </div>
                </div>
                <div className="second-row-lab-records ">
                <div className="form-element input-container">
                        <input type="number" id="bal-stock" required onChange={e => setbBalStock(e.target.value)} />
                        <label>Bal Stock</label> 
                    </div>
                    <div className="dates form-element">
                        <label for="expiry-date">Expiry Date</label>
                        <input type="date" id="expiry-date" required onChange={e => setExpiryDate(e.target.value)} />
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