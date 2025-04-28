// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin-user-controller");

// Register admin
router.post("/register", adminController.registerAdmin);

// Login admin
router.post("/login", adminController.loginAdmin);

module.exports = router;
