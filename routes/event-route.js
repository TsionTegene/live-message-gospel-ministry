// routes/eventRoutes.js
const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event-controller");
const authenticateToken = require("../middleware/authMiddleware");

// Create Event
router.post("/", authenticateToken, eventController.createEvent);

// Get All Events
router.get("/", eventController.getAllEvents);

// Get Event by ID
router.get("/:id", eventController.getEventById);

// Update Event
router.put("/:id", authenticateToken, eventController.updateEvent);

// Delete Event
router.delete("/:id", authenticateToken, eventController.deleteEvent);
router.delete("/registrations/:id", eventController.deleteRegistration);
router.post('/registrations', eventController.createRegistration);
console.log("Event routes loaded"); // Add this at the top and restart

module.exports = router;
