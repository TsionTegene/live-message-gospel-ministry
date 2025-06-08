const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const adminModel = require("../models/admin-user-model");

const ADMIN_INVITE_CODE = process.env.ADMIN_INVITE_CODE || "supersecret";

// Admin Signup
const signup = async (req, res) => {
  try {
    const { username, email, password, invite_code } = req.body;

    if (!username || !email || !password || !invite_code) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (invite_code !== ADMIN_INVITE_CODE) {
      return res.status(403).json({ message: "Invalid admin invite code" });
    }

    const existing = await adminModel.findAdminByEmail(email);
    if (existing) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await adminModel.createAdmin(username, email, hashedPassword);

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Admin Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("🛂 Login attempt:", email);
    const admin = await adminModel.findAdminByEmail(email);

    if (!admin) {
      console.log("❌ No admin found");
      return res.status(400).json({ message: "Invalid credentials" });
    }
    console.log("🔍 Found admin:", admin);
    const validPassword = await bcrypt.compare(password, admin.password_hash);
    if (!validPassword) {
      console.log("❌ Invalid password");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: admin.id, email: admin.email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    console.log("✅ Token generated:", token);
    res.status(200).json({ token, admin: {
        id: admin.id,
        email: admin.email,
        username: admin.username,
      }, });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  signup,
  login,
};
