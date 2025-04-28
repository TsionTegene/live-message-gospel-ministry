// models/contactMessageModel.js
const db = require("../config/db"); // Import the pool or connection

// Create a contact message
const createContactMessage = async (contactData) => {
  const { name, email, subject, message } = contactData;
  const query = `
    INSERT INTO contact_messages (name, email, subject, message)
    VALUES (?, ?, ?, ?)
  `;

  try {
    const [result] = await db.execute(query, [name, email, subject, message]);
    return result; // Return the result with insertId
  } catch (err) {
    throw new Error("Error creating contact message: " + err.message);
  }
};

// Get all contact messages
const getAllContactMessages = async () => {
  try {
    const [rows] = await db.execute("SELECT * FROM contact_messages");
    return rows;
  } catch (err) {
    throw new Error("Error fetching contact messages: " + err.message);
  }
};

// Get contact message by ID
const getContactMessageById = async (id) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM contact_messages WHERE id = ?",
      [id]
    );
    return rows;
  } catch (err) {
    throw new Error("Error fetching contact message by ID: " + err.message);
  }
};

// Update a contact message
const updateContactMessage = async (id, contactData) => {
  const { name, email, subject, message } = contactData;
  const query = `
    UPDATE contact_messages 
    SET name = ?, email = ?, subject = ?, message = ? 
    WHERE id = ?
  `;

  try {
    const [result] = await db.execute(query, [
      name,
      email,
      subject,
      message,
      id,
    ]);
    return result; // Return the result with affectedRows
  } catch (err) {
    throw new Error("Error updating contact message: " + err.message);
  }
};

// Delete a contact message
const deleteContactMessage = async (id) => {
  try {
    const [result] = await db.execute(
      "DELETE FROM contact_messages WHERE id = ?",
      [id]
    );
    return result; // Return the result with affectedRows
  } catch (err) {
    throw new Error("Error deleting contact message: " + err.message);
  }
};

module.exports = {
  createContactMessage,
  getAllContactMessages,
  getContactMessageById,
  updateContactMessage,
  deleteContactMessage,
};
