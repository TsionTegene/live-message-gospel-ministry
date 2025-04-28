// routes/contactMessageRoutes.js
const express = require("express");
const router = express.Router();
const contactMessageController = require("../controllers/contact-message-controller");
const authenticateToken = require("../middleware/authMiddleware");

// Create a new contact message
router.post("/", contactMessageController.createContactMessage);

// Get all contact messages
router.get(
  "/",
  authenticateToken,
  contactMessageController.getAllContactMessages
);

// Get contact message by ID
router.get(
  "/:id",
  authenticateToken,
  contactMessageController.getContactMessageById
);

// Update contact message by ID
router.put(
  "/:id",
  authenticateToken,
  contactMessageController.updateContactMessage
);

// Delete contact message by ID
router.delete(
  "/:id",
  authenticateToken,
  contactMessageController.deleteContactMessage
);

module.exports = router;
