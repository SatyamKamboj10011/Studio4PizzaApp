const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
require("dotenv").config();
<<<<<<< HEAD
<<<<<<< HEAD
const path = require("path");
const multer = require("multer");
const fs = require("fs");
=======
const path = require('path');
>>>>>>> a5d554d945a1bdb1faa6923e431be4ab7d9094c9
=======
const path = require("path");
const multer = require("multer");
const fs = require("fs");
>>>>>>> ff0af5f53605ea50d12bcbc9609006c23d17500b

const app = express();
app.use(cors());
app.use(express.json());

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> ff0af5f53605ea50d12bcbc9609006c23d17500b
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

<<<<<<< HEAD
=======
>>>>>>> a5d554d945a1bdb1faa6923e431be4ab7d9094c9
=======
>>>>>>> ff0af5f53605ea50d12bcbc9609006c23d17500b
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

<<<<<<< HEAD
<<<<<<< HEAD
// Serve static images from the "images" folder
app.use("/images", express.static(imageDir));
=======
app.use("/images", express.static(path.join(__dirname, "images")));


>>>>>>> a5d554d945a1bdb1faa6923e431be4ab7d9094c9
=======
// Serve static images from the "images" folder
app.use("/images", express.static(imageDir));
>>>>>>> ff0af5f53605ea50d12bcbc9609006c23d17500b

// API to Fetch Users
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(result);
  });
});

<<<<<<< HEAD
<<<<<<< HEAD
// API to Fetch Pizzas
=======
>>>>>>> a5d554d945a1bdb1faa6923e431be4ab7d9094c9
=======
// API to Fetch Pizzas
>>>>>>> ff0af5f53605ea50d12bcbc9609006c23d17500b
app.get("/menu", (req, res) => {
  db.query("SELECT * FROM pizzas", (err, result) => {
    if (err) {
      console.error("Error fetching pizza data:", err);
      return res.status(500).send("Error fetching pizza data");
    }
    res.json(result); // Send the menu data as JSON
  });
});

<<<<<<< HEAD
<<<<<<< HEAD
// API to Fetch Sides
app.get("/side", (req, res) => {
  db.query("SELECT * FROM side", (err, result) => {
    if (err) {
      console.error("Error fetching side data:", err);
      return res.status(500).send("Error fetching side data");
=======
app.get("/side", (req, res) => {
  db.query("SELECT * FROM side", (err, result) => {
    if (err) {
      console.error("Error fetching pizza data:", err);
      return res.status(500).send("Error fetching pizza data");
>>>>>>> a5d554d945a1bdb1faa6923e431be4ab7d9094c9
=======
// API to Fetch Sides
app.get("/side", (req, res) => {
  db.query("SELECT * FROM side", (err, result) => {
    if (err) {
      console.error("Error fetching side data:", err);
      return res.status(500).send("Error fetching side data");
>>>>>>> ff0af5f53605ea50d12bcbc9609006c23d17500b
    }
    res.json(result); // Send the menu data as JSON
  });
});

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> ff0af5f53605ea50d12bcbc9609006c23d17500b
// API to Fetch Desserts
app.get("/desserts", (req, res) => {
  db.query("SELECT * FROM desserts", (err, result) => {
    if (err) {
      console.error("Error fetching desserts data:", err);
      return res.status(500).send("Error fetching desserts data");
    }
    res.json(result); // Send the menu data as JSON
  });
});

// API for Adding a New Pizza (with Image Upload)
app.post("/add/pizza", upload, (req, res) => {
  const { name, small_price, large_price, extra_large_price, description } = req.body;
  const image = req.file ? req.file.filename : ""; // Use the uploaded image file name

  // Log the uploaded file and form data
  console.log("Uploaded File:", req.file);
  console.log("Form Data:", req.body);

  if (!image) {
    return res.status(400).send("No image uploaded.");
  }

  // Validate price fields
  const smallPrice = parseFloat(small_price);
  const largePrice = parseFloat(large_price);
  const extraLargePrice = parseFloat(extra_large_price);

  if (isNaN(smallPrice) || isNaN(largePrice) || isNaN(extraLargePrice)) {
    return res.status(400).send("Invalid price values.");
  }

  const query = `
    INSERT INTO pizzas (name, small_price, large_price, extra_large_price, image, description) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  // Log the query and the data being inserted
  console.log("Query:", query);
  console.log("Data:", [name, smallPrice, largePrice, extraLargePrice, image, description]);

  db.query(query, [name, smallPrice, largePrice, extraLargePrice, image, description], (err, result) => {
    if (err) {
      console.error("Error adding pizza:", err);
      return res.status(500).send(`Database Error: ${err.message}`);
    }
    res.status(201).send("Pizza added successfully!");
  });
});

// API for Adding a New Side (with Image Upload)
app.post("/add/side", upload, (req, res) => {
  // Log the request body and uploaded file to debug
  console.log("Request Body:", req.body);
  console.log("Uploaded File:", req.file);

  const { name, small_price, large_price, description } = req.body;
  const image = req.file ? req.file.filename : ""; // Get the uploaded image file name

  if (!name || !small_price || !large_price || !description) {
    return res.status(400).send("Please provide all required fields: name, small_price, large_price, and description.");
  }

  if (!image) {
    return res.status(400).send("No image uploaded.");
  }

  const smallPrice = parseFloat(small_price);
  const largePrice = parseFloat(large_price);

  if (isNaN(smallPrice) || isNaN(largePrice)) {
    return res.status(400).send("Invalid price values.");
  }

  const query = `
    INSERT INTO side (name, small_price, large_price, image, description) 
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(query, [name, smallPrice, largePrice, image, description], (err, result) => {
    if (err) {
      console.error("Error adding side:", err);
      return res.status(500).send("Error adding side");
    }
    res.status(201).send("Side added successfully!");
  });
});

// API for Adding a New Dessert (with Image Upload)
app.post("/add/desserts", upload, (req, res) => {
  const { name, price, description } = req.body;
  const image = req.file ? req.file.filename : ""; // Use the uploaded image file name

  if (!image) {
    return res.status(400).send("No image uploaded.");
  }

  const query = `
    INSERT INTO desserts (name, price, image, description) 
    VALUES (?, ?, ?, ?)
  `;

  // Log the query and data being inserted
  console.log("Query:", query);
  console.log("Data:", [name, price, image, description]);

  db.query(query, [name, price, image, description], (err, result) => {
    if (err) {
      console.error("Error adding desserts:", err);
      return res.status(500).send(`Database Error: ${err.message}`);
    }
    res.status(201).send("Dessert added successfully!");
  });
});
<<<<<<< HEAD
=======

  
>>>>>>> a5d554d945a1bdb1faa6923e431be4ab7d9094c9
=======

//ORDERS..............
app.get("/orders", (req, res) => {
  db.query("SELECT * FROM orders ORDER BY order_date DESC", (err, result) => {
    if (err) {
      console.error("Error fetching orders:", err);
      return res.status(500).json({ message: "Error fetching orders" });
    }
    res.json(result);
  });
});

app.post("/place-order", (req, res) => {
  const { cart } = req.body;

  if (!cart || cart.length === 0) {
    return res.status(400).json({ message: "Cart is empty. Cannot place an order." });
  }

  const query = `
    INSERT INTO orders (item_id, category, size, toppings, total_price) 
    VALUES (?, ?, ?, ?, ?)
  `;

  cart.forEach((item) => {
    const toppingsString = item.toppings && item.toppings.length > 0 ? item.toppings.join(", ") : null;

    db.query(query, [item.item_id, item.category, item.size, toppingsString, item.total_price], (err) => {
      if (err) {
        console.error("Error adding order:", err);
        return res.status(500).json({ message: "Database error while adding order." });
      }
    });
  });

  res.status(201).json({ message: "Order placed successfully!" });
});

//CHECKOUT.............
const crypto = require("crypto"); // For unique order IDs

app.post("/checkout", (req, res) => {
  const cartItems = req.body.cart; // Get cart data from frontend

  if (!cartItems || cartItems.length === 0) {
    return res.status(400).json({ error: "Cart is empty!" });
  }

  const query = `
    INSERT INTO orders (order_id, user_id, item_id, item_name, category, size, quantity, toppings, total_price, status, payment_status, order_date) 
    VALUES ?`;

  const values = cartItems.map((item) => [
    crypto.randomUUID().slice(0, 10), // Unique order ID
    item.user_id || null, // Default to NULL if user_id is not provided
    item.item_id,
    item.name, // Store item name
    item.category || "Unknown",
    item.size || "None", // Default size to 'None' if not applicable
    item.quantity || 1, // Default quantity to 1
    JSON.stringify(item.toppings || []), // Convert toppings array to JSON
    parseFloat(item.total_price.toFixed(2)), // Ensure total_price is a valid number
    "Pending", // Default order status
    "Unpaid", // Default payment status
    new Date() // Order timestamp
  ]);

  console.log("📦 Inserting Order Data:", values);

  db.query(query, [values], (err, result) => {
    if (err) {
      console.error("❌ Error inserting order:", err);
      return res.status(500).json({ error: "Database error while inserting order" });
    }
    res.status(201).json({ message: "✅ Order placed successfully!" });
  });
});


>>>>>>> ff0af5f53605ea50d12bcbc9609006c23d17500b

// Start Server on Port 5000
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
