// controllers/eventController.js
const eventModel = require("../models/event-model");

// Create Event
const createEvent = async (req, res) => {
  const { title, description, date, image_url } = req.body;

  const eventData = { title, description, date, image_url };

  try {
    // Await the result of the event creation
    const result = await eventModel.createEvent(eventData);

    // Send a success response
    return res.status(201).json({
      message: "Event created successfully",
      eventId: result.insertId, // Assuming the result contains insertId
    });
  } catch (err) {
    // Handle any errors
    console.error("Error creating event:", err);
    return res.status(500).json({
      message: "Failed to create event",
      error: err.message,
    });
  }
};

// Get All Events
const getAllEvents = async (req, res) => {
  try {
    const events = await eventModel.getAllEvents(); // Await the promise from the model
    return res.status(200).json(events);
  } catch (err) {
    return res.status(500).json({
      message: "Failed to fetch events",
      error: err.message,
    });
  }
};

// Get Event by ID
const getEventById = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await eventModel.getEventById(id); // Await the promise from the model
    if (!event.length) {
      return res.status(404).json({ message: "Event not found" });
    }
    return res.status(200).json(event[0]);
  } catch (err) {
    return res.status(500).json({
      message: "Failed to fetch event",
      error: err.message,
    });
  }
};

// Update Event
const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { title, description, date, image_url } = req.body;

  const eventData = { title, description, date, image_url };

  try {
    const result = await eventModel.updateEvent(id, eventData); // Await the promise from the model
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Event not found" });
    }
    return res.status(200).json({ message: "Event updated successfully" });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to update event",
      error: err.message,
    });
  }
};

// Delete Event
const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await eventModel.deleteEvent(id); // Await the promise from the model
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Event not found" });
    }
    return res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to delete event",
      error: err.message,
    });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
