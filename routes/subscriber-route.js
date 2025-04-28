const express = require("express");
const router = express.Router();
const subscriberController = require("../controllers/subscriber-controller");
const authenticateToken = require("../middleware/authMiddleware");

// Create a new subscriber
router.post("/", subscriberController.createSubscriber);

// Get all subscribers
router.get("/", authenticateToken, subscriberController.getAllSubscribers);

// Delete a subscriber by email
router.delete("/unsubscribe/:email", subscriberController.deleteSubscriber);

module.exports = router;
