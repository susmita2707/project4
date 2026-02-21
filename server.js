const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

/* =====================
   CREATE COLLEGE
===================== */
app.post("/colleges", (req, res) => {
  const { name, address } = req.body;

  const sql = "INSERT INTO colleges (name, address) VALUES (?, ?)";
  db.query(sql, [name, address], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "College added", id: result.insertId });
  });
});

/* =====================
   GET ALL COLLEGES
===================== */
app.get("/colleges", (req, res) => {
  db.query("SELECT * FROM colleges", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

/* =====================
   ADD STUDENT
===================== */
app.post("/students", (req, res) => {
  const { name, email, age, college_id } = req.body;

  const sql =
    "INSERT INTO students (name, email, age, college_id) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, email, age, college_id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Student added", id: result.insertId });
  });
});

/* =====================
   GET STUDENTS WITH COLLEGE (JOIN)
===================== */
app.get("/students", (req, res) => {
  const sql = `
    SELECT students.id, students.name, students.email, students.age,
           colleges.name AS college_name
    FROM students
    LEFT JOIN colleges ON students.college_id = colleges.id
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

/* =====================
   DELETE STUDENT
===================== */
app.delete("/students/:id", (req, res) => {
  const sql = "DELETE FROM students WHERE id = ?";
  db.query(sql, [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Student deleted" });
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});