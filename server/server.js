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

            res.json(newMaterialRecord.rows[0]);
            console.log(dealerName);
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
 
// GET ALL STOCK HISTORY RECORDS
app.get("/appointment", async (req, res) => {
    try {
        const response = await pool.query("SELECT * FROM appointment");

        res.json(response.rows);
    } catch (error) {
        console.log(error.message);
    }
})

app.listen(port, () => {
    console.log("Server is running on port: ",port);
});