const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
  database: "pizza_ordering_db", // Make sure this matches your database name
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.message);
  } else {
    console.log("Connected to MySQL Database: pizza_ordering_db");
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
    res.json(result); // Send the menu data as JSON
  });
});

// API to Fetch Sides
app.get("/side", (req, res) => {
  db.query("SELECT * FROM side", (err, result) => {
    if (err) {
      console.error("Error fetching side data:", err);
      return res.status(500).send("Error fetching side data");
    }
    res.json(result); // Send the menu data as JSON
  });
});

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

// Login endpoint
app.post("/login", async (req, res) => {
  console.log("Received login request:", req.body);
  const { email, password } = req.body;

  try {
    // Check if user exists
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, users) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Server error" });
      }

      if (users.length === 0) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const user = users[0];

      // Verify password
      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, role: user.role },
        "your_jwt_secret_key",
        { expiresIn: "24h" }
      );

      // Remove password from user object before sending
      const { password: _, ...userWithoutPassword } = user;

      res.json({
        message: "Login successful",
        user: userWithoutPassword,
        token,
      });
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Registration endpoint
app.post("/register", async (req, res) => {
  console.log("Received registration request:", req.body);
  const { name, email, password } = req.body;

  // Validate input
  if (!name || !email || !password) {
    console.log("Missing required fields:", { name, email, password: !!password });
    return res.status(400).json({ message: "Please provide all required fields" });
  }

  try {
    // First, verify we're connected to the right database
    db.query("SELECT DATABASE()", (err, result) => {
      if (err) {
        console.error("Database verification error:", err);
        return res.status(500).json({ message: "Database connection error" });
      }
      console.log("Current database:", result[0]['DATABASE()']);
    });

    // Check if user already exists
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, users) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Server error" });
      }

      if (users.length > 0) {
        console.log("Email already registered:", email);
        return res.status(400).json({ message: "Email already registered" });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Insert new user
      const query = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'customer')";
      db.query(query, [name, email, hashedPassword], (err, result) => {
        if (err) {
          console.error("Error inserting user:", err);
          return res.status(500).json({ message: "Error creating user" });
        }

        console.log("User created successfully:", result.insertId);

        // Generate JWT token
        const token = jwt.sign(
          { userId: result.insertId, role: 'customer' },
          "your_jwt_secret_key",
          { expiresIn: "24h" }
        );

        res.status(201).json({
          message: "Registration successful",
          user: { id: result.insertId, name, email, role: 'customer' },
          token
        });
      });
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.put("/api/admin/menu/:id", upload, (req, res) => {
  const { id } = req.params;
  const { category } = req.query;
  const { name, description, price, small_price, large_price, extra_large_price } = req.body;
  const image = req.file ? req.file.filename : null;

  let query = "";
  let values = [];

  if (category === "pizza") {
    query = `UPDATE pizzas SET name = ?, small_price = ?, large_price = ?, extra_large_price = ?, description = ?${image ? ', image = ?' : ''} WHERE id = ?`;
    values = image ? [name, small_price, large_price, extra_large_price, description, image, id] :
                     [name, small_price, large_price, extra_large_price, description, id];
  } else if (category === "side") {
    query = `UPDATE side SET name = ?, small_price = ?, large_price = ?, description = ?${image ? ', image = ?' : ''} WHERE id = ?`;
    values = image ? [name, small_price, large_price, description, image, id] :
                     [name, small_price, large_price, description, id];
  } else if (category === "dessert") {
    query = `UPDATE desserts SET name = ?, price = ?, description = ?${image ? ', image = ?' : ''} WHERE id = ?`;
    values = image ? [name, price, description, image, id] :
                     [name, price, description, id];
  } else {
    return res.status(400).send("Invalid category");
  }

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Update error:", err);
      return res.status(500).send("Failed to update item");
    }
    res.send("Item updated successfully");
  });
});

//menu update admin features

app.delete("/api/admin/menu/:id", (req, res) => {
  const { id } = req.params;
  const { category } = req.query;

  let table = "";
  if (category === "pizza") table = "pizzas";
  else if (category === "side") table = "side";
  else if (category === "dessert") table = "desserts";
  else return res.status(400).send("Invalid category");

  const query = `DELETE FROM ${table} WHERE id = ?`;
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Delete error:", err);
      return res.status(500).send("Failed to delete item");
    }
    res.send("Item deleted successfully");
  });
});

//user update admin features
app.put("/api/admin/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, phone, status } = req.body;

  const query = `UPDATE users SET name = ?, email = ?, phone = ?, status = ? WHERE id = ?`;
  db.query(query, [name, email, phone, status, id], (err, result) => {
    if (err) return res.status(500).send("Error updating user");
    res.send("User updated successfully");
  });
});

app.delete("/api/admin/users/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM users WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).send("Error deleting user");
    res.send("User deleted successfully");
  });
});


//post drinks
app.post("/add/drinks", upload, (req, res) => {
  const { name, price, description } = req.body;
  const image = req.file ? req.file.filename : "";

  if (!image) {
    return res.status(400).send("No image uploaded.");
  }

  const parsedPrice = parseFloat(price);
  if (isNaN(parsedPrice)) {
    return res.status(400).send("Invalid price.");
  }

  const query = `
    INSERT INTO drinks (name, price, image, description, category)
    VALUES (?, ?, ?, ?, ?)
  `;

  const category = "cold"; // or dynamic if you want to support it

  db.query(query, [name, parsedPrice, image, description, category], (err, result) => {
    if (err) {
      console.error("Error adding drink:", err);
      return res.status(500).send("Database error while adding drink.");
    }
    res.status(201).send("Drink added successfully!");
  });
});


//get drinks 
app.get("/drinks", (req, res) => {
  db.query("SELECT * FROM drinks", (err, result) => {
    if (err) {
      console.error("Error fetching drinks:", err);
      return res.status(500).send("Error fetching drinks");
    }
    res.json(result);
  });
});

//FOR ZAP SCAN VULNERABILITY FIX RELATED TO 
app.use((req, res, next) => {
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;");
  res.removeHeader("X-Powered-By");
  next();
});

//TO DISABLE VERSION DISCLOSURE TO THE HACKERS
app.disable('x-powered-by'); // hides Express version



// Start Server on Port 5000
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
