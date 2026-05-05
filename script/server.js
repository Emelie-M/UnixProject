const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const SECRET = "supersecretkey";

// 🔌 Connect to MariaDB
const db = mysql.createConnection({
    host: "localhost",
    user: "em",
    password: "Passw0rd", // change this
    database: "project"
});

db.connect(err => {
    if (err) {
        console.error("DB connection failed:", err);
    } else {
        console.log("Connected to MariaDB");
    }
});


// ✅ SIGN UP
app.post("/signup", async (req, res) => {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO users (username, password) VALUES (?, ?)";

    db.query(sql, [username, hashedPassword], (err, result) => {
        if (err) {
            return res.status(400).json({ message: "User may already exist" });
        }

        res.json({ message: "User created" });
    });
});


// ✅ LOGIN
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    const sql = "SELECT * FROM users WHERE username = ?";

    db.query(sql, [username], async (err, results) => {
        if (err || results.length === 0) {
            return res.status(400).json({ message: "User not found" });
        }

        const user = results[0];

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
            return res.status(400).json({ message: "Wrong password" });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username },
            SECRET,
            { expiresIn: "1h" }
        );

        res.json({ message: "Login success", token });
    });
});


app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});