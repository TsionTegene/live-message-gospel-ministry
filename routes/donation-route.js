const authenticateToken = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();
const donationController = require("../controllers/donation-controller");

// Ensure you're using the correct controller functions here
router.post("/", authenticateToken, donationController.createDonation);
router.get("/", donationController.getAllDonations);
router.get("/:id", donationController.getDonationById);
router.put("/:id", authenticateToken, donationController.updateDonation);
router.delete("/:id", authenticateToken, donationController.deleteDonation);

module.exports = router;
