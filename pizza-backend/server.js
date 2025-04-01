const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const crypto = require("crypto"); // For unique order IDs

const app = express();
app.use(cors());
app.use(express.json());

// Ensure "images" folder exists
const imageDir = path.join(__dirname, "images");
if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir, { recursive: true });
}

// Set up the storage engine for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imageDir); // Upload the images to the "images" folder
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + path.extname(file.originalname); // Ensure unique file names
    cb(null, fileName); // Save the file with a unique name
  },
});

// Initialize Multer
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Only accept image files
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (extname && mimeType) {
      return cb(null, true);
    } else {
      cb("Error: Invalid file type. Only images are allowed.");
    }
  },
}).single("image"); // Expect a single image in the "image" field

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

// Serve static images from the "images" folder
app.use("/images", express.static(imageDir));

// API to Fetch Users
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(result);
  });
});

// API to Fetch Pizzas
app.get("/menu", (req, res) => {
  db.query("SELECT * FROM pizzas", (err, result) => {
    if (err) {
      console.error("Error fetching pizza data:", err);
      return res.status(500).send("Error fetching pizza data");
    }
    res.json(result);
  });
});

// API to Fetch Sides
app.get("/side", (req, res) => {
  db.query("SELECT * FROM side", (err, result) => {
    if (err) {
      console.error("Error fetching side data:", err);
      return res.status(500).send("Error fetching side data");
    }
    res.json(result);
  });
});

// API to Fetch Desserts
app.get("/desserts", (req, res) => {
  db.query("SELECT * FROM desserts", (err, result) => {
    if (err) {
      console.error("Error fetching desserts data:", err);
      return res.status(500).send("Error fetching desserts data");
    }
    res.json(result);
  });
});

// API for Adding a New Pizza (with Image Upload)
app.post("/add/pizza", upload, (req, res) => {
  const { name, small_price, large_price, extra_large_price, description } = req.body;
  const image = req.file ? req.file.filename : "";

  if (!image) {
    return res.status(400).send("No image uploaded.");
  }

  const smallPrice = parseFloat(small_price);
  const largePrice = parseFloat(large_price);
  const extraLargePrice = parseFloat(extra_large_price);

  if (isNaN(smallPrice) || isNaN(largePrice) || isNaN(extraLargePrice)) {
    return res.status(400).send("Invalid price values.");
  }

  const query = `INSERT INTO pizzas (name, small_price, large_price, extra_large_price, image, description) VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(query, [name, smallPrice, largePrice, extraLargePrice, image, description], (err, result) => {
    if (err) {
      console.error("Error adding pizza:", err);
      return res.status(500).send(`Database Error: ${err.message}`);
    }
    res.status(201).send("Pizza added successfully!");
  });
});

// API for Handling Orders and Checkout
app.post("/checkout", (req, res) => {
  const cartItems = req.body.cart;
  if (!cartItems || cartItems.length === 0) {
    return res.status(400).json({ error: "Cart is empty!" });
  }

  const query = `INSERT INTO orders (order_id, user_id, item_id, item_name, category, size, quantity, toppings, total_price, status, payment_status, order_date) VALUES ?`;

  const values = cartItems.map((item) => [
    crypto.randomUUID().slice(0, 10),
    item.user_id || null,
    item.item_id,
    item.name,
    item.category || "Unknown",
    item.size || "None",
    item.quantity || 1,
    JSON.stringify(item.toppings || []),
    parseFloat(item.total_price.toFixed(2)),
    "Pending",
    "Unpaid",
    new Date()
  ]);

  db.query(query, [values], (err, result) => {
    if (err) {
      console.error("Error inserting order:", err);
      return res.status(500).json({ error: "Database error while inserting order" });
    }
    res.status(201).json({ message: "Order placed successfully!" });
  });
});

// Start Server on Port 5000
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
