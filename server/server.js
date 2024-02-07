import express from 'express';
import cors from 'cors';
import pg from 'pg';
import { uid } from 'uid';
import { customAlphabet } from 'nanoid';

const app = express();
const port = 8080;

//middelware
app.use(cors());
app.use(express.json());

const pool = new pg.Client({
    user: "postgres",
    password: "RajPakhurde@12345",
    host: "localhost",
    database: "densmart",
    port: 5432
})

pool.connect();



// Routes

// Insert data into Patients Table
app.post("/patients", async(req, res) => {
    try {
        // const numericChar = '123456789';
        // const generateNumId = customAlphabet(numericChar, 5);
        // const newUid = generateNumId();
        
        const {patientName,regDate, gender,age, address, mobile, email} = req.body;
        const newPatient = await pool.query(
            "INSERT INTO patients (patient_name, reg_date, gender, age, address, mobile, email) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [patientName, regDate, gender,age, address, mobile, email]
        );

        const updateTable = await pool.query(
            "UPDATE patients SET document_with_index = to_tsvector(patient_name || ' ' || pid || ' ' || coalesce(mobile, ''))"
        )
    
        res.json(newPatient.rows[0]);
        
    } catch (error) {
        console.log(error.message);
    }
})

// Get all Patients Records
app.get("/patients", async (req, res) => {
    try {
        const response = await pool.query(
            "SELECT * FROM patients"
            );
        res.json(response.rows);
    } catch (error) {
        console.log(error.message);
    }
});

// Get a particular patient record
app.get("/patients/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const response = await pool.query(
            "SELECT * FROM patients WHERE pid=$1", [id]
        );
        res.json(response.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
})

// DELETE DATA FROM APPOINTMENT TABLE   
app.delete("/patients/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const deletePatient = await pool.query("DELETE FROM patients WHERE pid = $1", [id]);
        const deleteAppointment = await pool.query("DELETE FROM appointment WHERE patient_id = $1", [id]);
        const deleteLabRecord = await pool.query("DELETE FROM lab_record WHERE patient_id = $1", [id]);
        const deleteConsumeMaterial = await pool.query("DELETE FROM consume_material_record WHERE patient_id = $1", [id]);
        const deleteConsultingFee = await pool.query("DELETE FROM consulting_fee WHERE patient_id = $1", [id]);
 
        res.json("Patient deleted!");
    } catch (error) {
        console.log(error.message);
    }
})

// Insert data into material reacord table

app.post("/material-record", async (req, res) => {
    try {
        const {materialName, chargesPerQuantity, totalCharges, quantity, date, expiryDate, dealerName} = req. body;
        const newMaterialRecord = await pool.query(
            "INSERT INTO material_record (material_name, charges_per_quantity, total_charges, quantity, date, expiry_date, dealer) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [materialName, chargesPerQuantity, totalCharges, quantity, date, expiryDate, dealerName]
            );

        const updateMaterail = await pool.query("UPDATE material_record SET document_with_index = to_tsvector(material_name || ' ' || coalesce(dealer, ''))")    
        res.json(newMaterialRecord.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
})

// Get all material Records
app.get("/material-record", async (req, res) => {
    try {
        const response = await pool.query("SELECT * FROM material_record");

        res.json(response.rows);
    } catch (error) {
        console.log(error.message);
    }
})

// DELETE DATA FROM Material TABLE   
app.delete("/material-record/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const deleteMaterial = await pool.query("DELETE FROM material_record WHERE material_record_id = $1", [id]);

        res.json("Material Record deleted!");
    } catch (error) {
        console.log(error.message);
    }
})

// INSERT DATA INTO MAINTENANCE RECORD TABLE
app.post("/maintenance-record", async(req, res) => {
    try {
        const {chargesPaid, date, maintenanceWork} = req.body;
        const newPatient = await pool.query(
            "INSERT INTO maintenance_record (charges_paid, date, maintenance_work) VALUES($1, $2, $3) RETURNING *",
            [chargesPaid, date, maintenanceWork]
        );

        const updateMaintenance = await pool.query("UPDATE maintenance_record SET document_with_index = to_tsvector(coalesce(maintenance_work, ''))")
        res.json(newPatient.rows[0]);
        
    } catch (error) {
        console.log(error.message);
    }
})

// GET ALL MAINTENANCE RECORDS
app.get("/maintenance-record", async (req, res) => {
    try {
        const response = await pool.query("SELECT * FROM maintenance_record");

        res.json(response.rows);
    } catch (error) {
        console.log(error.message);
    }
})

// DELETE DATA FROM Maintenance TABLE   
app.delete("/maintenance-record/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const deleteMaintenance = await pool.query("DELETE FROM maintenance_record WHERE maintenance_record_id = $1", [id]);

        res.json("Maintenance Record deleted!");
    } catch (error) {
        console.log(error.message);
    }
})

// INSERT DATA INTO SALARY RECORD TABLE
app.post("/salary", async (req, res) => {
    try {
        const {employeeName, salaryPaid, date} = req.body;
        const newSalaryRecord = await pool.query(
            "INSERT INTO salary_record (employee_name, salary_paid, date) VALUES ($1, $2, $3) RETURNING *",
            [employeeName, salaryPaid, date]
        );

        const updateSalary = await pool.query("UPDATE salary_record SET document_with_index = to_tsvector(coalesce(employee_name, ''))")

        res.json(newSalaryRecord.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
})

// GET ALL SALARY RECORDS
app.get("/salary", async (req, res) => {
    try {
        const response = await pool.query("SELECT * FROM salary_record");

        res.json(response.rows);
    } catch (error) {
        console.log(error.message);
    }
})

// DELETE DATA FROM SALARY TABLE   
app.delete("/salary/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const deleteSalary = await pool.query("DELETE FROM salary_record WHERE salary_record_id = $1", [id]);

        res.json("Salary Record deleted!");
    } catch (error) {
        console.log(error.message);
    }
})

// INSERT DATA INTO STOCK HISTORY RECORD TABLE
app.post("/stock", async (req, res) => {
    try {
        const {materialName, totalStock, usedStock, balStock, expiryDate, leftDays} = req.body;
        const newStockRecord = await pool.query(
            "INSERT INTO stock_history_record (material_name, total_stock, used_stock, bal_stock, expiry_date, left_days) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [materialName, totalStock, usedStock, balStock, expiryDate, leftDays]
        );

        const updateStock = await pool.query("UPDATE stock_history_record SET document_with_index = to_tsvector( coalesce(material_name  , ''))")

        res.json(newStockRecord.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
})
 
// GET ALL STOCK HISTORY RECORDS
app.get("/stock", async (req, res) => {
    try {
        const response = await pool.query("SELECT * FROM stock_history_record");

        res.json(response.rows);
    } catch (error) {
        console.log(error.message);
    }
})

// DELETE DATA FROM Stock TABLE   
app.delete("/stock/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const deleteStock = await pool.query("DELETE FROM stock_history_record WHERE stock_history_id = $1", [id]);

        res.json("Stock Record deleted!");
    } catch (error) {
        console.log(error.message);
    }
})

// INSERT DATA INTO APPOINETMENT TABLE
app.post("/appointment", async (req, res) => {
    try {
        const {patientName, treatment, doctorName, inTime, outTime, status, mobile, patientID, appDate} = req.body;
        const newAppointment = await pool.query(
            "INSERT INTO appointment (patient_name, treatment, doctor_name, in_time, out_time, status, mobile, patient_iD, app_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
            [patientName, treatment, doctorName, inTime, outTime, status, mobile, patientID, appDate]
        );

        res.json(newAppointment.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
})
 
// GET ALL Appointment RECORDS
app.get("/appointment", async (req, res) => {
    try {
        const response = await pool.query("SELECT * FROM appointment");

        res.json(response.rows);
    } catch (error) {
        console.log(error.message);
    }
})

app.get("/appointment/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const response = await pool.query("SELECT * FROM appointment WHERE patient_id = $1",[id]);

        res.json(response.rows);
       
    } catch (error) {
        console.log(error.message);
    }
})

app.get("/new", async (req, res) => {
    console.log("hello");
    try {
        const response = await pool.query("SELECT * FROM appointment WHERE status=$1", ["new"]);

        res.json(response.rows);
        console.log("getting response");
        console.log(response.rows);
    } catch (error) {
        console.log(error.message);
    }
})

app.get("/checkin", async (req, res) => {
    try {
        const response = await pool.query("SELECT * FROM appointment WHERE status=$1", ["checkin"]);

        res.json(response.rows);
    } catch (error) {
        console.log(error.message);
    }
})

app.get("/cancel", async (req, res) => {
    try {
        const response = await pool.query("SELECT * FROM appointment WHERE status=$1", ["cancel"]);

        res.json(response.rows);
    } catch (error) {
        console.log(error.message);
    }
})

app.get("/completed", async (req, res) => {
    try {
        const response = await pool.query("SELECT * FROM appointment WHERE status=$1", ["completed"]);

        res.json(response.rows);
    } catch (error) {
        console.log(error.message);
    }
})

// UPDATE STATUS FROM APPOINTMENT TABLE
app.put("/appointment/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const {status} = req.body;
        const updateStatus = await pool.query(
            "UPDATE appointment SET status = $1 WHERE appointment_id = $2",
            [status, id]
        )

        res.json("Status updated!");
    } catch (error) {
        console.log(error.message);
    }
})

// DELETE DATA FROM APPOINTMENT TABLE   
app.delete("/appointment/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const deleteAppointment = await pool.query("DELETE FROM appointment WHERE appointment_id = $1", [id]);
        console.log(id, "deleted");
        res.json("Appointment deleted!");
    } catch (error) {
        console.log(error.message);
    }
})


 
// INSERT DATA INTO LAB RECORD TABLE
app.post("/lab", async (req, res) => {
    try {
        const {patientName, mobile, labWork, labName, labCharges, impressionDate, sendDate, reciveDate, insertionDate, patientID} = req.body;
        const newLabReord = await pool.query(
            "INSERT INTO lab_record (patient_name, mobile, lab_work, lab_name, lab_charges, impression_date, send_date, recive_date, insertion_date, patient_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
            [patientName, mobile, labWork, labName, labCharges, impressionDate, sendDate, reciveDate, insertionDate, patientID]
        );

        const updateLab = await pool.query(
            "UPDATE lab_record SET document_with_index = to_tsvector(patient_name || ' ' || lab_name || ' ' || coalesce(mobile, ''))"
            )
        res.json(newLabReord.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
})
 
// GET ALL LAB RECORD RECORDS
app.get("/lab", async (req, res) => {
    try {
        const response = await pool.query("SELECT * FROM lab_record");

        res.json(response.rows);
    } catch (error) {
        console.log(error.message);
    }
})

// GET SINGLE PATIENT LAB RECORD
app.get("/lab/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const response = await pool.query("SELECT * FROM lab_record WHERE patient_id = $1",[id]);

        res.json(response.rows);
    } catch (error) {
        console.log(error.message);
    }
})

// DELETE DATA FROM APPOINTMENT TABLE   
app.delete("/lab/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const deleteLab = await pool.query("DELETE FROM lab_record WHERE lab_record_id = $1", [id]);

        res.json("Appointment deleted!");
    } catch (error) {
        console.log(error.message);
    }
})

// INSERT DATA INTO CONSUME MATERIAL RECORD TABLE
app.post("/consumematerial", async (req, res) => {
    try {
        const {patientName, materialName, date, doses, patientID} = req.body;
        const newConsumeMaterial = await pool.query(
            "INSERT INTO consume_material_record (user_name, material_name, date, doses, patient_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [patientName, materialName, date, doses, patientID]
        );

        const updateConsume = await pool.query("UPDATE consume_material_record SET document_with_index = to_tsvector(material_name || ' ' || coalesce(user_name, ''))")

        res.json(newConsumeMaterial.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
})
 
// GET ALL CONSUME MATERIAL RECORDS
app.get("/consumematerial", async (req, res) => {
    try {
        const response = await pool.query("SELECT * FROM consume_material_record");

        res.json(response.rows);
    } catch (error) {
        console.log(error.message);
    }
})

// GET SINGLE CONSUME MATERIAL RECORD OF PATIENT
app.get("/consumematerial/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const response = await pool.query("SELECT * FROM consume_material_record WHERE patient_id = $1",[id]);

        res.json(response.rows);
    } catch (error) {
        console.log(error.message);
    }
})

// DELETE DATA FROM Consume material TABLE   
app.delete("/consumematerial/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const deleteStock = await pool.query("DELETE FROM consume_material_record WHERE consume_material_id = $1", [id]);

        res.json("Consume Material Record deleted!");
    } catch (error) {
        console.log(error.message);
    }
})


// INSERT INTO CONSULTING FEE TABLE
app.post("/consultingfee", async (req, res) => {
    try {
        const {patientName, treatment, doctorName, creaditedAmount,consultingAmount, date, modeOfPayment, patientID} = req.body;
        const newConsultingFee = await pool.query(
            "INSERT INTO consulting_fee (patient_name, treatment, doctor_name, creadited_amount,consultant_amount, date, mode_of_payment,  patient_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
            [patientName, treatment, doctorName, creaditedAmount,consultingAmount, date, modeOfPayment, patientID]
        );

        const updateConsultingfee = await pool.query("UPDATE consulting_fee SET document_with_index = to_tsvector(coalesce(patient_name, ''))")

        res.json(newConsultingFee.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
})
 
// GET ALL CONSUME MATERIAL RECORDS
app.get("/consultingfee", async (req, res) => {
    try {
        const response = await pool.query("SELECT * FROM consulting_fee");

        res.json(response.rows);
    } catch (error) {
        console.log(error.message);
    }
})

// GET SINGLE CONSULTING FEE RECORD OF PATIENT
app.get("/consultingfee/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const response = await pool.query("SELECT * FROM consulting_fee WHERE patient_id = $1",[id]);

        res.json(response.rows);
    } catch (error) {
        console.log(error.message);
    }
})

// DELETE DATA FROM Consultingfee TABLE   
app.delete("/consultingfee/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const deleteConsultingfee = await pool.query("DELETE FROM consulting_fee WHERE consulting_fee_id = $1", [id]);

        res.json("Consulting Fee Record deleted!");
    } catch (error) {
        console.log(error.message);
    }
})

// SEARCH QUERY FOR PATIENT TABLE
app.get("/search-patient", async (req, res) => {
    try {
        const searchTerm  = req.query.term;
        const response = await pool.query("SELECT * FROM patients WHERE document_with_index @@ to_tsquery($1)",[searchTerm]);
        res.json(response.rows);
        
    } catch (error) {
        console.log(error.message);
    }
})

// SEARCH QUERY FOR LAB RECORD
app.get("/search-lab", async (req, res) => {
    try {
        const searchTerm  = req.query.term;
        const response = await pool.query("SELECT * FROM lab_record WHERE document_with_index @@ to_tsquery($1)",[searchTerm]);
        res.json(response.rows);
        
    } catch (error) {
        console.log(error.message);
    }
})

// SEARCH QUERY FOR MATERIAL RECORD
app.get("/search-material", async (req, res) => {
    try {
        const searchTerm  = req.query.term;
        const response = await pool.query("SELECT * FROM material_record WHERE document_with_index @@ to_tsquery($1)",[searchTerm]);
        res.json(response.rows);
        
    } catch (error) {
        console.log(error.message);
    }
})

// SEARCH QUERY FOR Maintenance RECORD
app.get("/search-maintenance", async (req, res) => {
    try {
        const searchTerm  = req.query.term;
        const response = await pool.query("SELECT * FROM maintenance_record WHERE document_with_index @@ to_tsquery($1)",[searchTerm]);
        res.json(response.rows);
        
    } catch (error) {
        console.log(error.message);
    }
})

// SEARCH QUERY FOR salary RECORD
app.get("/search-salary", async (req, res) => {
    try {
        const searchTerm  = req.query.term;
        const response = await pool.query("SELECT * FROM salary_record WHERE document_with_index @@ to_tsquery($1)",[searchTerm]);
        res.json(response.rows);
        
    } catch (error) {
        console.log(error.message);
    }
})

// SEARCH QUERY FOR Consume RECORD
app.get("/search-consume", async (req, res) => {
    try {
        const searchTerm  = req.query.term;
        const response = await pool.query("SELECT * FROM consume_material_record WHERE document_with_index @@ to_tsquery($1)",[searchTerm]);
        res.json(response.rows);
        
    } catch (error) {
        console.log(error.message);
    }
})

// SEARCH QUERY FOR stock RECORD
app.get("/search-stock", async (req, res) => {
    try {
        const searchTerm  = req.query.term;
        const response = await pool.query("SELECT * FROM stock_history_record WHERE document_with_index @@ to_tsquery($1)",[searchTerm]);
        res.json(response.rows);
        
    } catch (error) {
        console.log(error.message);
    }
})

// SEARCH QUERY FOR CONSULTING FEE RECORD
app.get("/search-consultingfee", async (req, res) => {
    try {
        const searchTerm  = req.query.term;
        const response = await pool.query("SELECT * FROM consulting_fee WHERE document_with_index @@ to_tsquery($1)",[searchTerm]);
        res.json(response.rows);
        
    } catch (error) {
        console.log(error.message);
    }
})

// Dashboard data
app.get("/dashboard", async (req, res) => {
   
    try {
        const regPatients = await pool.query("SELECT COUNT(*) AS registration_count FROM patients");
        const malePatients = await pool.query("SELECT COUNT(*) AS registration_count FROM patients WHERE gender=$1",['male']);
        const femalePatients = await pool.query("SELECT COUNT(*) AS registration_count FROM patients WHERE gender=$1",['female']);
        const agePatients = await pool.query("SELECT COUNT(*) AS registration_count FROM patients WHERE age<=$1",[20]);
        
        const Today = await pool.query("SELECT COUNT(*) AS registration_count FROM patients WHERE DATE(reg_date) = CURRENT_DATE")
        const ThisMonth = await pool.query("SELECT COUNT(*) AS registration_count FROM patients WHERE EXTRACT(YEAR FROM reg_date) = EXTRACT(YEAR FROM CURRENT_DATE) AND EXTRACT(MONTH FROM reg_date) = EXTRACT(MONTH FROM CURRENT_DATE)");
        const LastMonth = await pool.query("SELECT COUNT(*) AS registration_count FROM patients WHERE EXTRACT(YEAR FROM reg_date) = EXTRACT(YEAR FROM CURRENT_DATE - INTERVAL '1 month') AND EXTRACT(MONTH FROM reg_date) = EXTRACT(MONTH FROM CURRENT_DATE - INTERVAL '1 month')");
        const ThisYear = await pool.query("SELECT COUNT(*) AS registration_count FROM patients WHERE EXTRACT(YEAR FROM reg_date) = EXTRACT(YEAR FROM CURRENT_DATE)");
        const LastYear = await pool.query("SELECT COUNT(*) AS registration_count FROM patients WHERE EXTRACT(YEAR FROM reg_date) = EXTRACT(YEAR FROM CURRENT_DATE - INTERVAL '1 year')");
       
        const newAppToday = await pool.query("SELECT COUNT(*) AS registration_count FROM appointment WHERE DATE(app_date) = CURRENT_DATE")
        const newAppThisMonth = await pool.query("SELECT COUNT(*) AS registration_count FROM appointment WHERE EXTRACT(YEAR FROM app_date) = EXTRACT(YEAR FROM CURRENT_DATE) AND EXTRACT(MONTH FROM app_date) = EXTRACT(MONTH FROM CURRENT_DATE)");
        const newAppLastMonth = await pool.query("SELECT COUNT(*) AS registration_count FROM appointment WHERE EXTRACT(YEAR FROM app_date) = EXTRACT(YEAR FROM CURRENT_DATE - INTERVAL '1 month') AND EXTRACT(MONTH FROM app_date) = EXTRACT(MONTH FROM CURRENT_DATE - INTERVAL '1 month')");
        const newAppThisYear = await pool.query("SELECT COUNT(*) AS registration_count FROM appointment WHERE EXTRACT(YEAR FROM app_date) = EXTRACT(YEAR FROM CURRENT_DATE)");
        const newALastYear = await pool.query("SELECT COUNT(*) AS registration_count FROM appointment WHERE EXTRACT(YEAR FROM app_date) = EXTRACT(YEAR FROM CURRENT_DATE - INTERVAL '1 year')");
       
        const tretmentToday = await pool.query("SELECT COUNT(*) AS registration_count FROM appointment WHERE DATE(app_date) = CURRENT_DATE AND status='completed'")
        const treatmentThisMonth = await pool.query("SELECT COUNT(*) AS registration_count FROM appointment WHERE EXTRACT(YEAR FROM app_date) = EXTRACT(YEAR FROM CURRENT_DATE) AND EXTRACT(MONTH FROM app_date) = EXTRACT(MONTH FROM CURRENT_DATE) AND status='completed'");
        const treatmentLastMonth = await pool.query("SELECT COUNT(*) AS registration_count FROM appointment WHERE EXTRACT(YEAR FROM app_date) = EXTRACT(YEAR FROM CURRENT_DATE - INTERVAL '1 month') AND EXTRACT(MONTH FROM app_date) = EXTRACT(MONTH FROM CURRENT_DATE - INTERVAL '1 month') AND status='completed'");
        const treatmentThisYear = await pool.query("SELECT COUNT(*) AS registration_count FROM appointment WHERE EXTRACT(YEAR FROM app_date) = EXTRACT(YEAR FROM CURRENT_DATE) AND status='completed'");
        const treatmentLastYear = await pool.query("SELECT COUNT(*) AS registration_count FROM appointment WHERE EXTRACT(YEAR FROM app_date) = EXTRACT(YEAR FROM CURRENT_DATE - INTERVAL '1 year') AND status='completed'");

        const completeDentureToday = await pool.query("SELECT COUNT(*) AS registration_count FROM appointment WHERE DATE(app_date) = CURRENT_DATE AND treatment='Complete Denture'")
        const completeDentureThisMonth = await pool.query("SELECT COUNT(*) AS registration_count FROM appointment WHERE EXTRACT(YEAR FROM app_date) = EXTRACT(YEAR FROM CURRENT_DATE) AND EXTRACT(MONTH FROM app_date) = EXTRACT(MONTH FROM CURRENT_DATE) AND treatment='Complete Denture'");
        const completeDentureLastMonth = await pool.query("SELECT COUNT(*) AS registration_count FROM appointment WHERE EXTRACT(YEAR FROM app_date) = EXTRACT(YEAR FROM CURRENT_DATE - INTERVAL '1 month') AND EXTRACT(MONTH FROM app_date) = EXTRACT(MONTH FROM CURRENT_DATE - INTERVAL '1 month') AND treatment='Complete Denture'");
        const completeDentureThisYear = await pool.query("SELECT COUNT(*) AS registration_count FROM appointment WHERE EXTRACT(YEAR FROM app_date) = EXTRACT(YEAR FROM CURRENT_DATE) AND treatment='Complete Denture'");
        const completeDentureLastYear = await pool.query("SELECT COUNT(*) AS registration_count FROM appointment WHERE EXTRACT(YEAR FROM app_date) = EXTRACT(YEAR FROM CURRENT_DATE - INTERVAL '1 year') AND treatment='Complete Denture'");
       
        const compositeRestorationToday = await pool.query("SELECT COUNT(*) AS registration_count FROM appointment WHERE DATE(app_date) = CURRENT_DATE AND treatment='Composite Restoration'")
        const compositeRestorationThisMonth = await pool.query("SELECT COUNT(*) AS registration_count FROM appointment WHERE EXTRACT(YEAR FROM app_date) = EXTRACT(YEAR FROM CURRENT_DATE) AND EXTRACT(MONTH FROM app_date) = EXTRACT(MONTH FROM CURRENT_DATE) AND treatment='Composite Restoration'");
        const compositeRestorationLastMonth = await pool.query("SELECT COUNT(*) AS registration_count FROM appointment WHERE EXTRACT(YEAR FROM app_date) = EXTRACT(YEAR FROM CURRENT_DATE - INTERVAL '1 month') AND EXTRACT(MONTH FROM app_date) = EXTRACT(MONTH FROM CURRENT_DATE - INTERVAL '1 month') AND treatment='Composite Restoration'");
        const compositeRestorationThisYear = await pool.query("SELECT COUNT(*) AS registration_count FROM appointment WHERE EXTRACT(YEAR FROM app_date) = EXTRACT(YEAR FROM CURRENT_DATE) AND treatment='Composite Restoration'");
        const compositeRestorationLastYear = await pool.query("SELECT COUNT(*) AS registration_count FROM appointment WHERE EXTRACT(YEAR FROM app_date) = EXTRACT(YEAR FROM CURRENT_DATE - INTERVAL '1 year') AND treatment='Composite Restoration'");
       
        const consultationToday = await pool.query("SELECT COUNT(*) AS registration_count FROM appointment WHERE DATE(app_date) = CURRENT_DATE AND treatment='Consultation'")
        const consultationThisMonth = await pool.query("SELECT COUNT(*) AS registration_count FROM appointment WHERE EXTRACT(YEAR FROM app_date) = EXTRACT(YEAR FROM CURRENT_DATE) AND EXTRACT(MONTH FROM app_date) = EXTRACT(MONTH FROM CURRENT_DATE) AND treatment='Consultation'");
        const consultationLastMonth = await pool.query("SELECT COUNT(*) AS registration_count FROM appointment WHERE EXTRACT(YEAR FROM app_date) = EXTRACT(YEAR FROM CURRENT_DATE - INTERVAL '1 month') AND EXTRACT(MONTH FROM app_date) = EXTRACT(MONTH FROM CURRENT_DATE - INTERVAL '1 month') AND treatment='Consultation'");
        const consultationThisYear = await pool.query("SELECT COUNT(*) AS registration_count FROM appointment WHERE EXTRACT(YEAR FROM app_date) = EXTRACT(YEAR FROM CURRENT_DATE) AND treatment='Consultation'");
        const consultationLastYear = await pool.query("SELECT COUNT(*) AS registration_count FROM appointment WHERE EXTRACT(YEAR FROM app_date) = EXTRACT(YEAR FROM CURRENT_DATE - INTERVAL '1 year') AND treatment='Consultation'");
       
        const crownToday = await pool.query("SELECT COUNT(*) AS registration_count FROM appointment WHERE DATE(app_date) = CURRENT_DATE AND treatment='Crown'")
        const crownThisMonth = await pool.query("SELECT COUNT(*) AS registration_count FROM appointment WHERE EXTRACT(YEAR FROM app_date) = EXTRACT(YEAR FROM CURRENT_DATE) AND EXTRACT(MONTH FROM app_date) = EXTRACT(MONTH FROM CURRENT_DATE) AND treatment='Crown'");
        const crownLastMonth = await pool.query("SELECT COUNT(*) AS registration_count FROM appointment WHERE EXTRACT(YEAR FROM app_date) = EXTRACT(YEAR FROM CURRENT_DATE - INTERVAL '1 month') AND EXTRACT(MONTH FROM app_date) = EXTRACT(MONTH FROM CURRENT_DATE - INTERVAL '1 month') AND treatment='Crown'");
        const crownThisYear = await pool.query("SELECT COUNT(*) AS registration_count FROM appointment WHERE EXTRACT(YEAR FROM app_date) = EXTRACT(YEAR FROM CURRENT_DATE) AND treatment='Crown'");
        const crownLastYear = await pool.query("SELECT COUNT(*) AS registration_count FROM appointment WHERE EXTRACT(YEAR FROM app_date) = EXTRACT(YEAR FROM CURRENT_DATE - INTERVAL '1 year') AND treatment='Crown'");
       
        const extractionToday = await pool.query("SELECT COUNT(*) AS registration_count FROM appointment WHERE DATE(app_date) = CURRENT_DATE AND treatment='Extraction'")
        const extractionThisMonth = await pool.query("SELECT COUNT(*) AS registration_count FROM appointment WHERE EXTRACT(YEAR FROM app_date) = EXTRACT(YEAR FROM CURRENT_DATE) AND EXTRACT(MONTH FROM app_date) = EXTRACT(MONTH FROM CURRENT_DATE) AND treatment='Extraction'");
        const extractionLastMonth = await pool.query("SELECT COUNT(*) AS registration_count FROM appointment WHERE EXTRACT(YEAR FROM app_date) = EXTRACT(YEAR FROM CURRENT_DATE - INTERVAL '1 month') AND EXTRACT(MONTH FROM app_date) = EXTRACT(MONTH FROM CURRENT_DATE - INTERVAL '1 month') AND treatment='Extraction'");
        const extractionThisYear = await pool.query("SELECT COUNT(*) AS registration_count FROM appointment WHERE EXTRACT(YEAR FROM app_date) = EXTRACT(YEAR FROM CURRENT_DATE) AND treatment='Extraction'");
        const extractionLastYear = await pool.query("SELECT COUNT(*) AS registration_count FROM appointment WHERE EXTRACT(YEAR FROM app_date) = EXTRACT(YEAR FROM CURRENT_DATE - INTERVAL '1 year') AND treatment='Extraction'");
       
        const fpdToday = await pool.query("SELECT COUNT(*) AS registration_count FROM appointment WHERE DATE(app_date) = CURRENT_DATE AND treatment='FPD'")
        const fpdThisMonth = await pool.query("SELECT COUNT(*) AS registration_count FROM appointment WHERE EXTRACT(YEAR FROM app_date) = EXTRACT(YEAR FROM CURRENT_DATE) AND EXTRACT(MONTH FROM app_date) = EXTRACT(MONTH FROM CURRENT_DATE) AND treatment='FPD'");
        const fpdLastMonth = await pool.query("SELECT COUNT(*) AS registration_count FROM appointment WHERE EXTRACT(YEAR FROM app_date) = EXTRACT(YEAR FROM CURRENT_DATE - INTERVAL '1 month') AND EXTRACT(MONTH FROM app_date) = EXTRACT(MONTH FROM CURRENT_DATE - INTERVAL '1 month') AND treatment='FPD'");
        const fpdThisYear = await pool.query("SELECT COUNT(*) AS registration_count FROM appointment WHERE EXTRACT(YEAR FROM app_date) = EXTRACT(YEAR FROM CURRENT_DATE) AND treatment='FPD'");
        const fpdLastYear = await pool.query("SELECT COUNT(*) AS registration_count FROM appointment WHERE EXTRACT(YEAR FROM app_date) = EXTRACT(YEAR FROM CURRENT_DATE - INTERVAL '1 year') AND treatment='FPD'");
       
        const implantToday = await pool.query("SELECT COUNT(*) AS registration_count FROM appointment WHERE DATE(app_date) = CURRENT_DATE AND treatment='Implant'")
        const implantThisMonth = await pool.query("SELECT COUNT(*) AS registration_count FROM appointment WHERE EXTRACT(YEAR FROM app_date) = EXTRACT(YEAR FROM CURRENT_DATE) AND EXTRACT(MONTH FROM app_date) = EXTRACT(MONTH FROM CURRENT_DATE) AND treatment='Implant'");
        const implantLastMonth = await pool.query("SELECT COUNT(*) AS registration_count FROM appointment WHERE EXTRACT(YEAR FROM app_date) = EXTRACT(YEAR FROM CURRENT_DATE - INTERVAL '1 month') AND EXTRACT(MONTH FROM app_date) = EXTRACT(MONTH FROM CURRENT_DATE - INTERVAL '1 month') AND treatment='Implant'");
        const implantThisYear = await pool.query("SELECT COUNT(*) AS registration_count FROM appointment WHERE EXTRACT(YEAR FROM app_date) = EXTRACT(YEAR FROM CURRENT_DATE) AND treatment='Implant'");
        const implantLastYear = await pool.query("SELECT COUNT(*) AS registration_count FROM appointment WHERE EXTRACT(YEAR FROM app_date) = EXTRACT(YEAR FROM CURRENT_DATE - INTERVAL '1 year') AND treatment='Implant'");
       
        const orthodonticToday = await pool.query("SELECT COUNT(*) AS registration_count FROM appointment WHERE DATE(app_date) = CURRENT_DATE AND treatment='Orthodontic Treatment'")
        const orthodonticThisMonth = await pool.query("SELECT COUNT(*) AS registration_count FROM appointment WHERE EXTRACT(YEAR FROM app_date) = EXTRACT(YEAR FROM CURRENT_DATE) AND EXTRACT(MONTH FROM app_date) = EXTRACT(MONTH FROM CURRENT_DATE) AND treatment='Orthodontic Treatment'");
        const orthodonticLastMonth = await pool.query("SELECT COUNT(*) AS registration_count FROM appointment WHERE EXTRACT(YEAR FROM app_date) = EXTRACT(YEAR FROM CURRENT_DATE - INTERVAL '1 month') AND EXTRACT(MONTH FROM app_date) = EXTRACT(MONTH FROM CURRENT_DATE - INTERVAL '1 month') AND treatment='Orthodontic Treatment'");
        const orthodonticThisYear = await pool.query("SELECT COUNT(*) AS registration_count FROM appointment WHERE EXTRACT(YEAR FROM app_date) = EXTRACT(YEAR FROM CURRENT_DATE) AND treatment='Orthodontic Treatment'");
        const orthodonticLastYear = await pool.query("SELECT COUNT(*) AS registration_count FROM appointment WHERE EXTRACT(YEAR FROM app_date) = EXTRACT(YEAR FROM CURRENT_DATE - INTERVAL '1 year') AND treatment='Orthodontic Treatment'");
       
        const rootToday = await pool.query("SELECT COUNT(*) AS registration_count FROM appointment WHERE DATE(app_date) = CURRENT_DATE AND treatment='Root Canal Treatment'")
        const rootThisMonth = await pool.query("SELECT COUNT(*) AS registration_count FROM appointment WHERE EXTRACT(YEAR FROM app_date) = EXTRACT(YEAR FROM CURRENT_DATE) AND EXTRACT(MONTH FROM app_date) = EXTRACT(MONTH FROM CURRENT_DATE) AND treatment='Root Canal Treatment'");
        const rootLastMonth = await pool.query("SELECT COUNT(*) AS registration_count FROM appointment WHERE EXTRACT(YEAR FROM app_date) = EXTRACT(YEAR FROM CURRENT_DATE - INTERVAL '1 month') AND EXTRACT(MONTH FROM app_date) = EXTRACT(MONTH FROM CURRENT_DATE - INTERVAL '1 month') AND treatment='Root Canal Treatment'");
        const rootThisYear = await pool.query("SELECT COUNT(*) AS registration_count FROM appointment WHERE EXTRACT(YEAR FROM app_date) = EXTRACT(YEAR FROM CURRENT_DATE) AND treatment='Root Canal Treatment'");
        const rootLastYear = await pool.query("SELECT COUNT(*) AS registration_count FROM appointment WHERE EXTRACT(YEAR FROM app_date) = EXTRACT(YEAR FROM CURRENT_DATE - INTERVAL '1 year') AND treatment='Root Canal Treatment'");

        res.json({
            regPatients: regPatients.rows[0].registration_count,
            malePatients: malePatients.rows[0].registration_count,
            femalePatients: femalePatients.rows[0].registration_count,
            agePatients: agePatients.rows[0].registration_count,

            Today0: Today.rows[0].registration_count,
            ThisMonth0: ThisMonth.rows[0].registration_count,
            LastMonth0: LastMonth.rows[0].registration_count,
            ThisYear0: ThisYear.rows[0].registration_count,
            LastYear0: LastYear.rows[0].registration_count,
            
            Today1: newAppToday.rows[0].registration_count,
            ThisMonth1: newAppThisMonth.rows[0].registration_count,
            LastMonth1: newAppLastMonth.rows[0].registration_count,
            ThisYear1: newAppThisYear.rows[0].registration_count,
            LastYear1: newALastYear.rows[0].registration_count,
            
            Today2: Today.rows[0].registration_count,
            ThisMonth2: ThisMonth.rows[0].registration_count,
            LastMonth2: LastMonth.rows[0].registration_count,
            ThisYear2: ThisYear.rows[0].registration_count,
            LastYear2: LastYear.rows[0].registration_count,

            Today3: tretmentToday.rows[0].registration_count,
            ThisMonth3: treatmentThisMonth.rows[0].registration_count,
            LastMonth3: treatmentLastMonth.rows[0].registration_count,
            ThisYear3: treatmentThisYear.rows[0].registration_count,
            LastYear3: treatmentLastYear.rows[0].registration_count,

            completeDentureToday: completeDentureToday.rows[0].registration_count,
            completeDentureThisMonth: completeDentureThisMonth.rows[0].registration_count,
            completeDentureLastMonth: completeDentureLastMonth.rows[0].registration_count,
            completeDentureThisYear: completeDentureThisYear.rows[0].registration_count,
            completeDentureLastYear: completeDentureLastYear.rows[0].registration_count,
            
            compositeRestorationToday: compositeRestorationToday.rows[0].registration_count,
            compositeRestorationThisMonth: compositeRestorationThisMonth.rows[0].registration_count,
            compositeRestorationLastMonth: compositeRestorationLastMonth.rows[0].registration_count,
            compositeRestorationThisYear: compositeRestorationThisYear.rows[0].registration_count,
            compositeRestorationLastYear: compositeRestorationLastYear.rows[0].registration_count,
            
            consultationToday: consultationToday.rows[0].registration_count,
            consultationThisMonth: consultationThisMonth.rows[0].registration_count,
            consultationLastMonth: consultationLastMonth.rows[0].registration_count,
            consultationThisYear: consultationThisYear.rows[0].registration_count,
            consultationLastYear: consultationLastYear.rows[0].registration_count,
            
            crownToday: crownToday.rows[0].registration_count,
            crownThisMonth: crownThisMonth.rows[0].registration_count,
            crownLastMonth: crownLastMonth.rows[0].registration_count,
            crownThisYear: crownThisYear.rows[0].registration_count,
            crownLastYear: crownLastYear.rows[0].registration_count,
            
            extractionToday: extractionToday.rows[0].registration_count,
            extractionThisMonth: extractionThisMonth.rows[0].registration_count,
            extractionLastMonth: extractionLastMonth.rows[0].registration_count,
            extractionThisYear: extractionThisYear.rows[0].registration_count,
            extractionLastYear: extractionLastYear.rows[0].registration_count,
            
            fpdToday: fpdToday.rows[0].registration_count,
            fpdThisMonth: fpdThisMonth.rows[0].registration_count,
            fpdLastMonth: fpdLastMonth.rows[0].registration_count,
            fpdThisYear: fpdThisYear.rows[0].registration_count,
            fpdLastYear: fpdLastYear.rows[0].registration_count,
          
            implantToday: implantToday.rows[0].registration_count,
            implantThisMonth: implantThisMonth.rows[0].registration_count,
            implantLastMonth: implantLastMonth.rows[0].registration_count,
            implantThisYear: implantThisYear.rows[0].registration_count,
            implantLastYear: implantLastYear.rows[0].registration_count,
          
            orthodonticToday: orthodonticToday.rows[0].registration_count,
            orthodonticThisMonth: orthodonticThisMonth.rows[0].registration_count,
            orthodonticLastMonth: orthodonticLastMonth.rows[0].registration_count,
            orthodonticThisYear: orthodonticThisYear.rows[0].registration_count,
            orthodonticLastYear: orthodonticLastYear.rows[0].registration_count,
          
            rootToday: rootToday.rows[0].registration_count,
            rootThisMonth: rootThisMonth.rows[0].registration_count,
            rootLastMonth: rootLastMonth.rows[0].registration_count,
            rootThisYear: rootThisYear.rows[0].registration_count,
            rootLastYear: rootLastYear.rows[0].registration_count,


        })
    } catch (error) {
        console.log(error.message);
    }
})


app.listen(port, () => {
    console.log("Server is running on port: ",port);
});