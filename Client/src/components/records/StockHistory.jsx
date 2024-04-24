import React, { useState, useEffect }  from "react";
import { Zoom } from '@mui/material';

const  StockHistory = (props) => {
    const [allStockHistory, setAllStockHistory] = useState([]);

    var startDate = "";
    var endDate = "";

    function handleClick(event) {
        props.setCurrentTable(event.target.id);
    }

    const handleStartDateChange = (event) => {  
        startDate = event.target.value; 
        getAllRecordsDates(); 
    };

    const handleEndDateChange = (event) => {  
        endDate = event.target.value;
        getAllRecordsDates();
    };

    const getAllRecordsDates = async () => {
        try {
            const response = await fetch(`http://localhost:8080/stockdates?startDate=${startDate}&endDate=${endDate}`);
            const jsonDate = await response.json();
    
            setAllStockHistory(jsonDate);
        } catch (error) {
            console.log(error.message);
        }
    }

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

     // Search 
     const searchQuery = async (e) => {
        try {
            const response = await fetch("http://localhost:8080/search-stock?term="+e.target.value);
            const jsonData = await response.json();

            if (jsonData.length === 0) return getStockHistory()
            setAllStockHistory(jsonData); 
            
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {   
        getStockHistory();
    },[]);

    const handleBtnClick = async (id) => {
        try {
            const deletestock = await fetch("http://localhost:8080/stock/"+id, {
                method: "DELETE"
            });

            getStockHistory();
        } catch (error) {
            console.log(error.message);
        } 
    }

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
        <Zoom in={true}> 
        <div className="sub-tables">
            <div className="upper-div">
                <div className="first-div" >
                    <select name="alldates" id="all-dates" required>
                    <option value="alldates">All Dates</option>
                    </select>
                    <p  >From</p>
                    <input type="date" id="from-date" required onChange={handleStartDateChange}/>
                    <p >To</p>
                    <input type="date" id="to-date" required onChange={handleEndDateChange}/>
                </div>

                <div className="second-div" >
                    <div className="lab-record-searchbar searchbar input-container">
                        <input type="search" name="searchPatients" className="searchLabRecords" placeholder=" Material name"
                        onChange={searchQuery}
                        />
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
                            <th class="table-header" id="action">Controls</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allStockHistory.map((stock) => {
                            const formattedDate = new Date(stock.expiry_date).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

                            return  <tr>
                                        <td>{stock.stock_history_id}</td>
                                        <td>{stock.material_name}</td>
                                        <td>{stock.total_stock}</td>
                                        <td>{stock.used_stock}</td>
                                        <td>{stock.bal_stock}</td>
                                        <td>{formattedDate.split(',')[0]}</td>
                                        <td>1</td>
                                        <td className='patient-delete-btn'>
                                            {/* <i class="fa-solid fa-pencil"></i> */}
                                            <i class="fa-solid fa-trash"
                                             onClick={() =>{
                                                if(!window.confirm("Are you sure?")) return
                                                handleBtnClick(stock.stock_history_id);
                                            }
                                            }
                                            ></i>
                                        </td>  
                                    </tr>
                        })}
                    </tbody>
               
                
                </table>
            </div>
        </div> 
        </Zoom>
    );
};

export default StockHistory;