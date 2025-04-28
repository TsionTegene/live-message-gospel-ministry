// controllers/adminController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const adminModel = require("../models/admin-user-model");

// Register Admin
async function registerAdmin(req, res) {
  const { username, email, password } = req.body;
  console.log(req.body);

  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    await adminModel.createAdmin(username, email, passwordHash);

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Registration failed" });
  }
}

// Login Admin
async function loginAdmin(req, res) {
  const { email, password } = req.body;

  try {
    const admin = await adminModel.findAdminByEmail(email);

    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password_hash);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Login failed" });
  }
}

module.exports = {
  registerAdmin,
  loginAdmin,
};
