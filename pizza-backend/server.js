const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
require("dotenv").config();
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MySQL Database
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Default XAMPP MySQL user
  password: "", // Default is empty
  database: "pizza_ordering_db",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.message);
  } else {
    console.log("Connected to MySQL Database!");
  }
});

app.use("/images", express.static(path.join(__dirname, "images")));



// API to Fetch Users
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(result);
  });
});

app.get("/menu", (req, res) => {
  db.query("SELECT * FROM pizzas", (err, result) => {
    if (err) {
      console.error("Error fetching pizza data:", err);
      return res.status(500).send("Error fetching pizza data");
    }
    res.json(result); // Send the menu data as JSON
  });
});

app.get("/side", (req, res) => {
  db.query("SELECT * FROM side", (err, result) => {
    if (err) {
      console.error("Error fetching pizza data:", err);
      return res.status(500).send("Error fetching pizza data");
    }
    res.json(result); // Send the menu data as JSON
  });
});


  

// Start Server on Port 5000
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
