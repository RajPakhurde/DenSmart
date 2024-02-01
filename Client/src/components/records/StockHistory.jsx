import React, { useState, useEffect }  from "react";

const  StockHistory = (props) => {
    const [allStockHistory, setAllStockHistory] = useState([]);

    // Get all stock history data
    const getStockHistory = async () => {
        try {
            const response = await fetch("http://localhost:8080/stock");
            const jsonData = await response.json();

            setAllStockHistory(jsonData);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {   
        getStockHistory();
    },[]);

    function handleClick(event) {
        props.setCurrentTable(event.target.id);
    }

    var fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - 30);
    var fromD = fromDate.toISOString().substring(0,10);

    var toDate = new Date();
    toDate.setDate(toDate.getDate());
    var toD = toDate.toISOString().substring(0,10);

    return (
        <div className="sub-tables">
            <div className="upper-div">
                <div className="first-div" >
                    <select name="alldates" id="all-dates" required>
                    <option value="alldates">All Dates</option>
                    </select>
                    <p  >From</p>
                    <input type="date" id="from-date" required defaultValue={fromD}/>
                    <p >To</p>
                    <input type="date" id="to-date" required defaultValue={toD}/>
                </div>

                <div className="second-div" >
                    <div className="lab-record-searchbar searchbar input-container">
                        <input type="search" name="searchPatients" className="searchLabRecords" placeholder=" PID / Name / Mobile No"/>
                        <p><i class="fa-solid fa-magnifying-glass"></i></p>
                    </div>
                    <div>
                        <button id="new-stockhistory-record" className="new-btn-appointment" onClick={handleClick}>+ Add New</button>
                    </div>
                </div>
            </div>
            

            <div class="patient-info">
                <table class="table">
                    <thead>
                        <tr>
                            <th class="table-header" id="sno">SNo</th>
                            <th class="table-header" id="materialsname">Materials Name</th>
                            <th class="table-header" id="totalstock">Total Stock</th>
                            <th class="table-header" id="doses">Used Stock</th>
                            <th class="table-header" id="username">Bal Stock</th>
                            <th class="table-header" id="action">Expiry Date</th>
                            <th class="table-header" id="action">Left Days</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allStockHistory.map((stock) => {
                            return  <tr>
                                        <td>{stock.stock_history_id}</td>
                                        <td>{stock.material_name}</td>
                                        <td>{stock.total_stock}</td>
                                        <td>{stock.used_stock}</td>
                                        <td>{stock.bal_stock}</td>
                                        <td>{stock.expiry_date.split('T')[0]}</td>
                                        <td>1</td>
                                        <td>
                                        <i class="fa-solid fa-pencil"></i>
                                        <i class="fa-solid fa-trash"></i>
                                        </td>
                                    </tr>
                        })}
                    </tbody>
               
                
                </table>
            </div>
        </div> 
    );
};

export default StockHistory;