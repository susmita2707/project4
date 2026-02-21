const express = require("express");
const router = express.Router();
const db = require("../db");

/* CREATE COLLEGE */
router.post("/", (req, res) => {
  const { name, address } = req.body;

  const sql = "INSERT INTO colleges (name, address) VALUES (?, ?)";
  db.query(sql, [name, address], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "College added", id: result.insertId });
  });
});

/* GET ALL COLLEGES */
router.get("/", (req, res) => {
  db.query("SELECT * FROM colleges", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

module.exports = router;