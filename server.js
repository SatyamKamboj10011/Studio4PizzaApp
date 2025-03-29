const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MySQL connection configuration for XAMPP
const pool = mysql.createPool({
  host: "localhost",
  user: "root",  // default XAMPP username
  password: "",  // default XAMPP password is empty
  database: "pizza_ordering_db",  // Updated database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Convert pool to use promises
const promisePool = pool.promise();

// Test database connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Successfully connected to MySQL database");
  connection.release();
});

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  jwt.verify(token, "your_jwt_secret_key", (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    req.user = user;
    next();
  });
};

// Admin middleware
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Admin access required" });
  }
};

// Protected routes example
app.get("/api/protected", authenticateToken, (req, res) => {
  res.json({ message: "Protected route accessed successfully", user: req.user });
});

app.get("/api/admin", authenticateToken, isAdmin, (req, res) => {
  res.json({ message: "Admin route accessed successfully", user: req.user });
});

// Admin Dashboard Routes
app.get("/api/admin/stats", async (req, res) => {
  try {
    // Get counts from all tables
    const [ordersCount] = await pool.query("SELECT COUNT(*) as count FROM orders");
    const [pizzasCount] = await pool.query("SELECT COUNT(*) as count FROM pizzas");
    const [dessertsCount] = await pool.query("SELECT COUNT(*) as count FROM desserts");
    const [sidesCount] = await pool.query("SELECT COUNT(*) as count FROM side");
    const [usersCount] = await pool.query("SELECT COUNT(*) as count FROM users");

    // Get total revenue
    const [revenueResult] = await pool.query("SELECT SUM(total_amount) as total FROM orders");
    
    // Get recent orders
    const [recentOrders] = await pool.query(
      "SELECT * FROM orders ORDER BY created_at DESC LIMIT 5"
    );

    // Get popular items (combining all categories)
    const [popularItems] = await pool.query(`
      (SELECT name, 'pizza' as category, price FROM pizzas ORDER BY id DESC LIMIT 2)
      UNION ALL
      (SELECT name, 'dessert' as category, price FROM desserts ORDER BY id DESC LIMIT 2)
      UNION ALL
      (SELECT name, 'side' as category, price FROM side ORDER BY id DESC LIMIT 2)
      ORDER BY id DESC LIMIT 5
    `);

    res.json({
      totalOrders: ordersCount[0].count,
      totalRevenue: revenueResult[0].total || 0,
      totalCustomers: usersCount[0].count,
      totalMenuItems: pizzasCount[0].count + dessertsCount[0].count + sidesCount[0].count,
      recentOrders,
      popularItems
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/admin/orders", async (req, res) => {
  try {
    const [orders] = await pool.query(
      "SELECT * FROM orders ORDER BY created_at DESC"
    );
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: error.message });
  }
});

app.put("/api/admin/orders/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const [result] = await pool.query(
      "UPDATE orders SET status = ? WHERE id = ?",
      [status, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Order status updated successfully" });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/admin/users", async (req, res) => {
  try {
    const [users] = await pool.query(
      "SELECT id, name, email, phone, created_at, status FROM users"
    );
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: error.message });
  }
});

// Menu Management Routes
app.get("/api/admin/menu", async (req, res) => {
  try {
    const [pizzas] = await pool.query("SELECT *, 'pizza' as category FROM pizzas");
    const [desserts] = await pool.query("SELECT *, 'dessert' as category FROM desserts");
    const [sides] = await pool.query("SELECT *, 'side' as category FROM side");
    
    const menuItems = [
      ...pizzas.map(item => ({ ...item, category: 'pizza' })),
      ...desserts.map(item => ({ ...item, category: 'dessert' })),
      ...sides.map(item => ({ ...item, category: 'side' }))
    ];
    
    res.json(menuItems);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/admin/menu", upload.single("image"), async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const image = req.file ? req.file.filename : null;

    let query = "";
    let values = [];

    switch (category) {
      case "pizza":
        query = "INSERT INTO pizzas (name, description, price, image) VALUES (?, ?, ?, ?)";
        values = [name, description, price, image];
        break;
      case "dessert":
        query = "INSERT INTO desserts (name, description, price, image) VALUES (?, ?, ?, ?)";
        values = [name, description, price, image];
        break;
      case "side":
        query = "INSERT INTO side (name, description, price, image) VALUES (?, ?, ?, ?)";
        values = [name, description, price, image];
        break;
      default:
        return res.status(400).json({ message: "Invalid category" });
    }

    await pool.query(query, values);
    res.json({ message: "Menu item added successfully" });
  } catch (error) {
    console.error("Error adding menu item:", error);
    res.status(500).json({ message: error.message });
  }
});

app.put("/api/admin/menu/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const image = req.file ? req.file.filename : null;

    let query = "";
    let values = [];

    switch (category) {
      case "pizza":
        query = "UPDATE pizzas SET name = ?, description = ?, price = ?" + 
                (image ? ", image = ?" : "") + " WHERE id = ?";
        values = image ? [name, description, price, image, req.params.id] : 
                       [name, description, price, req.params.id];
        break;
      case "dessert":
        query = "UPDATE desserts SET name = ?, description = ?, price = ?" + 
                (image ? ", image = ?" : "") + " WHERE id = ?";
        values = image ? [name, description, price, image, req.params.id] : 
                       [name, description, price, req.params.id];
        break;
      case "side":
        query = "UPDATE side SET name = ?, description = ?, price = ?" + 
                (image ? ", image = ?" : "") + " WHERE id = ?";
        values = image ? [name, description, price, image, req.params.id] : 
                       [name, description, price, req.params.id];
        break;
      default:
        return res.status(400).json({ message: "Invalid category" });
    }

    await pool.query(query, values);
    res.json({ message: "Menu item updated successfully" });
  } catch (error) {
    console.error("Error updating menu item:", error);
    res.status(500).json({ message: error.message });
  }
});

app.delete("/api/admin/menu/:id", async (req, res) => {
  try {
    const { category } = req.query;
    let query = "";

    switch (category) {
      case "pizza":
        query = "DELETE FROM pizzas WHERE id = ?";
        break;
      case "dessert":
        query = "DELETE FROM desserts WHERE id = ?";
        break;
      case "side":
        query = "DELETE FROM side WHERE id = ?";
        break;
      default:
        return res.status(400).json({ message: "Invalid category" });
    }

    await pool.query(query, [req.params.id]);
    res.json({ message: "Menu item deleted successfully" });
  } catch (error) {
    console.error("Error deleting menu item:", error);
    res.status(500).json({ message: error.message });
  }
});

// Login endpoint
app.post("/login", async (req, res) => {
  console.log("Received login request:", req.body);
  const { email, password } = req.body;

  try {
    // Check if user exists
    const [users] = await promisePool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

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
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    console.log("Registration attempt for email:", email);

    // Check if user already exists
    const [existingUsers] = await promisePool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUsers.length > 0) {
      console.log("Email already registered:", email);
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log("Inserting new user into database...");
    
    // Insert new user
    const [result] = await promisePool.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, "customer"]
    );

    console.log("User registered successfully:", email);

    // Generate JWT token
    const token = jwt.sign(
      { userId: result.insertId, role: "customer" },
      "your_jwt_secret_key",
      { expiresIn: "24h" }
    );

    const response = {
      message: "Registration successful",
      user: { 
        id: result.insertId, 
        name, 
        email, 
        role: "customer",
        created_at: new Date()
      },
      token,
    };

    console.log("Sending response:", response);
    res.status(201).json(response);
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ 
      message: "Server error", 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something broke!", error: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 