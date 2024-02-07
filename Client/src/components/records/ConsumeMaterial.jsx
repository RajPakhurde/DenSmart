import React, { useState, useEffect } from "react";

const  ConsumeMaterial = (props) => {
    const [allConsumeMaterial, setAllConsumeMaterial] = useState([]);

    function handleClick(event) {
        props.setCurrentTable(event.target.id);
    }

    var fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - 30);
    var fromD = fromDate.toISOString().substring(0,10);

    var toDate = new Date();
    toDate.setDate(toDate.getDate());
    var toD = toDate.toISOString().substring(0,10);

     // Get all CONSUME MATERIAL Records
     const getAllConsumeMaterial = async () => {
        try {
            const response = await fetch("http://localhost:8080/consumematerial");
            const jsonDate = await response.json();

            setAllConsumeMaterial(jsonDate);
        } catch (error) {
            console.log(error.message);
        }
    }

     // Search 
     const searchQuery = async (e) => {
        try {
            const response = await fetch("http://localhost:8080/search-consume?term="+e.target.value);
            const jsonData = await response.json();

            if (jsonData.length === 0) return getAllConsumeMaterial()
            setAllConsumeMaterial(jsonData); 
            
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getAllConsumeMaterial();
    }, []);
 
    const handleBtnClick = async (id) => {
        try {
            const deleteconsume = await fetch("http://localhost:8080/consumematerial/"+id, {
                method: "DELETE"
            });

            getAllConsumeMaterial();
        } catch (error) {
            console.log(error.message);
        } 
    }

    let sNo = 1;

    return (
        <div className="sub-tables">
            <div className="upper-div">
                <div className="first-div" >
                    <select name="alldates" id="all-dates" required>
                    <option value="alldates">All Dates</option>
                    </select>
                    <p  >From</p>
                    <input type="date" id="from-date" required defaultValue={fromD} />
                    <p >To</p>
                    <input type="date" id="to-date" required defaultValue={toD} />
                </div>

                <div className="second-div" >
                    <div className="lab-record-searchbar searchbar input-container">
                        <input type="search" name="searchPatients" className="searchLabRecords" placeholder="Patient name / Material name"
                        onChange={searchQuery}
                        />
                    </div>
                    <div>
                        <button id="new-consumematerial-record" className="new-btn-appointment" onClick={handleClick}>+ Add New</button>
                    </div>
                </div>
            </div>
            

            <div class="patient-info">
                <table class="table">
                    <thead>
                        <tr>
                            <th class="table-header" id="sno">SNo</th>
                            <th class="table-header" id="date">Date</th>
                            <th class="table-header" id="materialsname">Materials Name</th>
                            <th class="table-header" id="doses">Doses</th>
                            <th class="table-header" id="username">Patient Name</th>
                            <th class="table-header" id="action">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allConsumeMaterial.map((consumeMaterial) => {
                            return  <tr>
                                        <td>{sNo++}</td>
                                        <td>{consumeMaterial.date.split('T')[0]}</td>
                                        <td>{consumeMaterial.material_name}</td>
                                        <td>{consumeMaterial.doses}</td>
                                        <td>{consumeMaterial.user_name}</td>
                                        <td className='patient-delete-btn'>
                                            <i class="fa-solid fa-pencil"></i>
                                            <i class="fa-solid fa-trash"
                                             onClick={() =>{
                                                if(!window.confirm("Are you sure?")) return
                                                handleBtnClick(consumeMaterial.consume_material_id);
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
    );
};

export default ConsumeMaterial;