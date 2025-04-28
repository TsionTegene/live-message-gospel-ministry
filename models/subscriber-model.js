const db = require("../config/db"); // Assuming db.js contains your MySQL pool connection

// Create Subscriber
const createSubscriber = async (email) => {
  try {
    const [result] = await db.execute(
      "INSERT INTO subscribers (email) VALUES (?)",
      [email]
    );
    return result; // Returns the result of the insertion
  } catch (err) {
    throw new Error("Error creating subscriber: " + err.message);
  }
};

// Get all subscribers
const getAllSubscribers = async () => {
  try {
    const [rows] = await db.execute("SELECT * FROM subscribers");
    return rows; // Returns all subscribers
  } catch (err) {
    throw new Error("Error fetching subscribers: " + err.message);
  }
};

// Get subscriber by email
const getSubscriberByEmail = async (email) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM subscribers WHERE email = ?",
      [email]
    );
    return rows;
  } catch (err) {
    throw new Error("Error fetching subscriber by email: " + err.message);
  }
};

// Delete subscriber by email
const deleteSubscriber = async (email) => {
  try {
    const [result] = await db.execute(
      "DELETE FROM subscribers WHERE email = ?",
      [email]
    );
    return result;
  } catch (err) {
    throw new Error("Error deleting subscriber: " + err.message);
  }
};

// Check if email already exists (to avoid duplicate subscription)
const isEmailSubscribed = async (email) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM subscribers WHERE email = ?",
      [email]
    );
    return rows.length > 0; // If a row exists, return true
  } catch (err) {
    throw new Error("Error checking if email is subscribed: " + err.message);
  }
};

module.exports = {
  createSubscriber,
  getAllSubscribers,
  getSubscriberByEmail,
  deleteSubscriber,
  isEmailSubscribed,
};
