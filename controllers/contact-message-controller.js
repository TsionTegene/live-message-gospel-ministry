// controllers/contactMessageController.js
const contactMessageModel = require("../models/contact-message-model");

// Create contact message
const createContactMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const contactData = { name, email, subject, message };
    const result = await contactMessageModel.createContactMessage(contactData);
    return res.status(201).json({
      message: "Contact message created successfully",
      contactMessageId: result.insertId,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Get all contact messages
const getAllContactMessages = async (req, res) => {
  try {
    const messages = await contactMessageModel.getAllContactMessages();
    return res.status(200).json(messages);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Get contact message by ID
const getContactMessageById = async (req, res) => {
  const { id } = req.params;

  try {
    const message = await contactMessageModel.getContactMessageById(id);
    if (message.length === 0) {
      return res.status(404).json({ message: "Contact message not found" });
    }
    return res.status(200).json(message[0]);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Update contact message
const updateContactMessage = async (req, res) => {
  const { id } = req.params;
  const { name, email, subject, message } = req.body;

  const contactData = { name, email, subject, message };

  try {
    const result = await contactMessageModel.updateContactMessage(
      id,
      contactData
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Contact message not found" });
    }
    return res
      .status(200)
      .json({ message: "Contact message updated successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Delete contact message
const deleteContactMessage = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await contactMessageModel.deleteContactMessage(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Contact message not found" });
    }
    return res
      .status(200)
      .json({ message: "Contact message deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createContactMessage,
  getAllContactMessages,
  getContactMessageById,
  updateContactMessage,
  deleteContactMessage,
};
