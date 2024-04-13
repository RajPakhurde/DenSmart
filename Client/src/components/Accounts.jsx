import React, { useState, useEffect } from 'react';

const Accounts = () => {
    const [allConsultantingFee, setAllConsultingFee] = useState([]);

    var fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - 30);
    var fromD = fromDate.toISOString().substring(0,10);

    var toDate = new Date();
    toDate.setDate(toDate.getDate());
    var toD = toDate.toISOString().substring(0,10);
     
    // Get all Account Records
    const getAllConsultingFee = async () => {
        try {
            const response = await fetch("http://localhost:8080/consultingfee");
            const jsonDate = await response.json();

            setAllConsultingFee(jsonDate);
        } catch (error) {
            console.log(error.message);
        }
    } 

    useEffect(() => {
        getAllConsultingFee();
    }, []);
     
    return (
        <div className="sub-tables accounts-container">
            <div className="upper-div">
                <div className="first-div-accounts" >
                    <div className='accounts-dates'>
                        <div className='accounts-date form-element'>
                            <lable for="from-date">From</lable>
                            <input type="date" id="from-date" required defaultValue={fromD}/>
                        </div>
                        <div className='accounts-date form-element'>
                            <lable for="to-date">To</lable>
                            <input type="date" id="to-date" required defaultValue={toD} />
                        </div>
                    </div>
                    
                    <select name="doctor-name" id="form-doctor-name" required>
                        <option value="default">--Doctors--</option>
                        <option value="Dr. Ritesh Mehta">Dr. Ritesh Mehta</option>
                    </select>

                    <select name="treatment-name" id="treatment-name" required>
                        <option value="default">--Treatments--</option>
                        <option value="all">--All--</option>
                        <option value="Complete Denture">Complete Denture</option>
                        <option value="Composite Restoration">
                            Composite Restoration
                        </option>
                        <option value="Consultation">Consultation</option>
                        <option value="Crown">Crown</option>
                        <option value="Extraction">Extraction</option>
                        <option value="FPD">FPD</option>
                        <option value="Implant">Implant</option> 
                        <option value="Orthodontic Treatment">
                            Orthodontic Treatment
                        </option>
                        <option value="Root Canal Treatment">
                            Root Canal Treatment 
                        </option>
                    </select>

                    <select name="modeofpayment" id="form-payment-mode" required>
                        <option value="default">--Mode of Payment--</option>
                        <option value="online">Online</option>
                        <option value="Cash">Cash</option>
                    </select>
                     
                </div>
            </div>
            

            <div class="patient-info">
                <table class="table">
                    <thead>
                        <tr>
                            <th class="table-header" id="sno">SNo</th>
                            <th class="table-header" id="materialsname">Date</th>
                            <th class="table-header" id="totalstock">Patient Name</th>
                            <th class="table-header" id="doses">Doctor Name</th>
                            <th class="table-header" id="username">Treatment Name</th>
                            <th class="table-header" id="action">Cerdited Amount</th>
                            <th class="table-header" id="action">Mode of Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allConsultantingFee.map((consultingfee) => {
                            const formattedDate = new Date(consultingfee.date).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

                            return <tr>
                                        <td>{consultingfee.consulting_fee_id}</td>
                                        <td>{formattedDate.split(',')[0]}</td>
                                        <td>{consultingfee.patient_name}</td>
                                        <td>{consultingfee.doctor_name}</td>
                                        <td>{consultingfee.treatment}</td>
                                        <td>{consultingfee.creadited_amount}</td>
                                        <td>{consultingfee.mode_of_payment}</td>
                                    </tr>
                        })}
                    </tbody>
                
                </table>
            </div>

            <div className='accounts-footer'>
                <div>
                    <p>Total Credit</p>
                    <h3>12000</h3>
                </div>
                <i class="fa-solid fa-minus"></i>
                <div>
                    <p>Total Debit</p>
                    <h3>0</h3>
                </div>
                <i class="fa-solid fa-equals"></i>
                <div>
                    <p>Total Income</p>
                    <h3>12000</h3>
                </div>
                <h1>|</h1>
                <div>
                    <p>Total Pendings</p>
                    <h3 className='tp'>5500</h3>
                </div>
            </div>
        </div> 
    );
};

export default Accounts;