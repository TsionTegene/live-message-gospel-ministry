const registrationModel = require("../models/registration-model");

const createRegistration = async (req, res) => {
  try {
    const { event_id, name, email, phone, notes } = req.body;
    if (!event_id || !name || !email || !phone)
      return res.status(400).json({ message: "Missing required fields" });

    const result = await registrationModel.createRegistration({ event_id, name, email, phone, notes });
    res.status(201).json({ message: "Registration successful", id: result.insertId });
  } catch (err) {
    console.error("Error creating registration:", err);
    res.status(500).json({ message: "Failed to register", error: err.message });
  }
};

const getRegistrations = async (req, res) => {
  try {
    const data = await registrationModel.getAllRegistrations();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch registrations", error: err.message });
  }
};

module.exports = { createRegistration, getRegistrations };
