import express from 'express';
import cors from 'cors';
import pg from 'pg';
import { uid } from 'uid';

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
        const newUid = uid();
        const {patientName,regDate, gender,age, address, mobile, email} = req.body;
        const newPatient = await pool.query(
            "INSERT INTO patients (patient_name, pid, reg_date, gender, age, address, mobile, email) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
            [patientName, newUid, regDate, gender,age, address, mobile, email]
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
            "UPDATE appointment SET status = $1 WHERE patient_id = $2",
            [status, id]
        )

        res.json("Status updated!");
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



app.listen(port, () => {
    console.log("Server is running on port: ",port);
});