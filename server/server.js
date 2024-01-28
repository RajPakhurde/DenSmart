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
        console.log(response.rows);
        console.log(typeof response.rows);
    } catch (error) {
        console.log(error.message);
    }
});

// Get a particular patient record
app.get("/patients/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const response = await pool.query(
            "SELECT * FROM patients WHERE id=$1", [id]
        );
        res.json(response.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
})



app.listen(port, () => {
    console.log("Server is running on port: ",port);
});