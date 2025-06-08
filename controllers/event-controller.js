// controllers/eventController.js
const eventModel = require("../models/event-model");

// Create Event
const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      time,
      location,
      image_url,
      is_paid,
      price
    } = req.body;

    if (!title || !date || !location) {
      return res.status(400).json({ message: "Title, date and location are required" });
    }

    const eventData = {
      title,
      description: description || "",
      date,           // Store raw string or format if needed
      time: time || "",
      location,
      image_url: image_url || "",
      is_paid: !!is_paid,
      price: is_paid ? price ?? null : null // only include price for paid events
    };

    const result = await eventModel.createEvent(eventData);

    return res.status(201).json({
      message: "Event created successfully",
      eventId: result.insertId,
    });
  } catch (err) {
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
    const events = await eventModel.getAllEvents();
    console.log("✅ Events fetched:", events);
    const normalizedEvents = events.map(event => ({
      ...event,
      image: event.image_url, // normalize to match frontend expectation
    }));

    return res.status(200).json(normalizedEvents);
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
    const event = await eventModel.getEventById(id);
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
  try {
    const {
      title,
      description = "",
      date,
      time = "",
      location = "",
      image_url = "",
      is_paid = false,
      price = null,
    } = req.body;

    const eventData = {
      title,
      description,
      date,
      time,
      location,
      image_url,
      is_paid,
      price,
    };

    const result = await eventModel.updateEvent(id, eventData);
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
    const result = await eventModel.deleteEvent(id);
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
const createRegistration = async (req, res) => {
  try {
    const { event_id, event_title, name, email, phone, notes } = req.body;

    if (!event_id || !name || !email || !phone) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const result = await eventModel.createRegistration({
      event_id,
      event_title,
      name,
      email,
      phone,
      notes,
    });

    res.status(201).json({ message: "Registration successful", id: result.insertId });
  } catch (err) {
    console.error("Error creating registration:", err);
    res.status(500).json({ message: "Failed to register", error: err.message });
  }
};
const deleteRegistration = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await eventModel.deleteRegistration(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Registration not found" });
    }
    res.status(200).json({ message: "Registration deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete registration", error: err.message });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  createRegistration,
  deleteRegistration,
};

