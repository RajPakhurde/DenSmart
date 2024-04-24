import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import domtoimage from 'dom-to-image';

const OpenPrescriptionImg = (props) => {
    
    const [prescription, setPrescription] = useState([]);
    const [patientsData, setPatientsData] = useState([]);
    let sNo = 1;
    var image = "";

     // Get all Appointment Records
     const getCurrectnPrescription = async () => {
        try {
            const response = await fetch("http://localhost:8080/prescription/"+props.appId);
            const jsonDate = await response.json();

            const response2 = await fetch("http://localhost:8080/patients/"+props.patientID);
            const jsonData2 = await response2.json();
            
            setPrescription(jsonDate);
            setPatientsData(jsonData2);

        } catch (error) {
            console.log(error.message);
        }
    }


    useEffect(() => {
        getCurrectnPrescription();
    }, []);

    const convertDivToImage = async () => {
        try {
          const divElement = document.querySelector('.main-pre');
      
          if (!divElement) {
            console.error('Div not found');
            return;
          }
      
          const canvas = await html2canvas(divElement);
        //   const imageDataUrl = canvas.toDataURL('image/png');
          image = canvas.toDataURL('image/png');
      
          // Do something with the image data URL
        //   console.log(imageDataUrl);
        } catch (error) {
          console.error('Error converting div to image:', error);
        }
      };
 
    //   const printPrescription = () => {
    //     let printContents = document.querySelector('.main-pre').innerHTML;
    //     let originalContents = document.body.innerHTML;
    //     document.body.innerHTML = printContents;
    //     window.print();
    //     document.body.innerHTML = originalContents; 
    //   }

    //   const printPrescription = () => {
    //     const printContents = document.querySelector('.main-pre').outerHTML;
    //     const printWindow = window.open('', '_blank');
    //     printWindow.document.write('<html><head><title>Print Prescription</title>');
    //     printWindow.document.write('<style>');
    //     printWindow.document.write(getComputedStyle(document.querySelector('.main-pre')).cssText);
    //     printWindow.document.write('</style></head><body>');
    //     printWindow.document.write(printContents);
    //     printWindow.document.write('</body></html>');
    //     printWindow.document.close();
    //     printWindow.print();
    // };
      
    const printPrescription = () => {
        const printContents = document.querySelector('.main-pre').outerHTML;
        const printWindow = window.open('', '_blank');
        printWindow.document.write('<html><head><title>Prescription</title>');
        printWindow.document.write('<style>');
        printWindow.document.write(`
            /* Add your CSS styles here */
            /* For example: */
            body { margin: 0; padding: 0; }
            .main-pre { /* Add your styles for .main-pre here */ }
            .pre-items { /* Add your styles for .pre-items here */ }
            /* Add more styles as needed */
            .main-pre {
                width: 1000px;
                padding-top: 20px;
                margin-top: 20px;
                border: 1px solid black;
                padding: 20px;
            }
            
            .pre-items {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .main-pre hr {
                width: 100%;
                border-radius: 0%;
            }
            
            .pre-table th{
                color: #404048;
                background-image: linear-gradient(white, white);
            }
            
            .pre-table tr:nth-child(even) {
                background-color: #fff;
                margin-top: 20px;
            }
            
            .pre-table table {
                border: 1px solid #c2c2c3f6;
                border-collapse: collapse;
            }
            .pre-table th {
                border: 1px solid #c2c2c3f6;
                border-collapse: collapse;
            }
            .pre-table td {
                border: 1px solid #c2c2c3f6;
                border-collapse: collapse;
                text-align: center;
            }
            
            .open-pre-container {
                font-family: 'Roboto', sans-serif;
                color: #7B809A;
            }

            .pre-table .table .prescription-table{
                width: 100%;
            }
        `);
        printWindow.document.write('</style></head><body>');
        printWindow.document.write(printContents);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    };
    // const convertDivToImage = () => {
    //     const divElement = document.querySelector('.main-pre');
      
    //     if (!divElement) {
    //       console.error('Div not found');
    //       return;
    //     }
      
    //     domtoimage.toPng(divElement)
    //       .then((dataUrl) => {
    //         // Do something with the image data URL
    //         console.log(dataUrl);
    //       })
    //       .catch((error) => {
    //         console.error('Error converting div to image:', error);
    //       });
    //   };

    // const generateImage = async () => {
    //     const divToCapture = document.querySelector('.main-pre');
      
    //     if (divToCapture) {
    //       const canvas = await html2canvas(divToCapture);
    //       const image = canvas.toDataURL('image/png');
    //       return image;
    //     }
    //   };

    //   const sendImageViaWhatsApp = async () => {
    //     const image = await generateImage();
    //     const phoneNumber = patientsData.mobile; // Replace with the recipient's phone number
        
    //     if (image && phoneNumber) {
    //         const encodedImage = encodeURIComponent(image);
    //         console.log(encodedImage);
    //       const whatsappUrl = "https://wa.me/" + phoneNumber + "?text=" + encodeURIComponent(image);
    //       window.open(whatsappUrl, '_blank').focus();
    //     }
     
    // };  

    return (
        <div className='open-pre-container'>
             <div className="form-header">
                <div className="form-heading"><h1>Prescription</h1></div> 
                    <div className="close-btn" onClick={() =>{
                        console.log("close prescription");
                        props.setCurrentTable("patient-info");
                        }}  >&times;
                    </div>
            </div>
            <hr />
            <div style={{display: "flex", justifyContent: "center"}}>
                <div>
                <div className='btn-whatsapp-print' style={{display: "flex", justifyContent: "flex-end", width: "1000px", gap: "10px"}} >
                    {/* <button onClick={convertDivToImage} style={{color: "#fff", backgroundColor: "#496ca4", padding: "10px", border: "none", borderRadius: "5px", fontSize: "15px"}} ><i class="fa-brands fa-whatsapp"></i> Whatsapp</button> */}
                    <button onClick={printPrescription} style={{color: "#fff", backgroundColor: "#496ca4", padding: "10px", border: "none", borderRadius: "5px", fontSize: "15px"}} ><i class="fa-solid fa-print" />Print</button>
                </div>
                <div className='main-pre'>
                    <div className='pre-items'>
                        <h1 style={{paddingTop: "0px"}} >Dr. Ritesh Ashok Mehta</h1>
                        <p><span>Phone: </span>9850619374</p>
                    </div>
                    <div className='pre-items'>
                        <p>Reg No.A11389</p>
                        <p><span>Closed On </span>Sunday</p>
                    </div>
                    <br />
                    <br />
                    <br />
                    <hr />
                    <div className='pre-items'>
                        <p>PID: {patientsData.pid}</p>
                        <h5><span>Date: </span>{new Date().toJSON().slice(0,10).split('-').reverse().join('/')}</h5>
                    </div> 
                    <div className='pre-items'>
                        <p><span>Patient: </span>{patientsData.patient_name} | {patientsData.gender} | {patientsData.age}</p>
                        <p><span>Mobile: </span>{patientsData.mobile} </p>
                    </div>
                    <br />
                    <hr />
                    <h3 style={{borderBottom: "1px solid black", width: "fit-content"}}>Prescription</h3>
                    <div className='pre-table'>
                        <table className="table prescription-table" style={{padding: "0px", marginTop: "10px"}}>
                            <thead>
                                <tr> 
                                    <th class="table-header" id="sno">SNo</th>
                                    <th class="table-header" id="patient-name">Medicine Name</th>
                                    <th class="table-header" id="date">Doses</th>
                                    <th class="table-header" id="treatment">Instruction</th>
                                    <th class="table-header" id="doctors">Days</th>
                                
                                </tr>
                            </thead>
                            <tbody>
                                {prescription.map((prescription) => {
                                    return <tr>
                                                <td>{sNo++}</td>
                                                <td>{prescription.medicine_name}</td>
                                                <td>{prescription.doses}</td>
                                                <td>{prescription.instruction}</td>
                                                <td>{prescription.days}</td>
                                            </tr>
                                })}
                            </tbody>
                            
                        </table> 
                    </div>
                    <br />
                    <br />
                    <div className='pre-items'>
                        <p></p>
                        <h2 style={{paddingTop: "0px"}} >Dr. Ritesh Ashok Mehta</h2>
                    </div>
                    <br />
                    <br />
                    <hr />
                    <div className='pre-items' style={{justifyContent: "center"}}>
                        <h2>Dentokraft Dental Care Centre</h2>
                    </div>
                    <div className='pre-items' style={{justifyContent: "center"}}>
                        <p><span>Address </span> : Mangaon</p>
                    </div>
                    <div className='pre-items' style={{justifyContent: "center"}}>
                        <p><span>Email: </span>riteshmehta1@gmail.com</p>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
};

export default OpenPrescriptionImg;