// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin-user-controller");

// Register admin
router.post("/signup", adminController.signup);

// Login admin
router.post("/login", adminController.login);

module.exports = router;
