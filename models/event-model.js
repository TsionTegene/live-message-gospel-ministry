// models/eventModel.js
const db = require("../config/db"); // Import the pool

// Create Event function (returns a Promise)
async function createEvent(eventData) {
  const { title, description, date, image_url } = eventData;
  const [result] = await db.execute(
    "INSERT INTO events (title, description, date, image_url) VALUES (?, ?, ?, ?)",
    [title, description, date, image_url]
  );
  return result;
}

// Get all events
const getAllEvents = async () => {
  try {
    const [rows] = await db.execute("SELECT * FROM events");
    return rows;
  } catch (err) {
    throw new Error("Error fetching events: " + err.message);
  }
};

// Get event by ID
const getEventById = async (id) => {
  try {
    const [rows] = await db.execute("SELECT * FROM events WHERE id = ?", [id]);
    return rows;
  } catch (err) {
    throw new Error("Error fetching event by ID: " + err.message);
  }
};

// Update event
const updateEvent = async (id, eventData) => {
  const { title, description, date, image_url } = eventData;
  const query = `
    UPDATE events 
    SET title = ?, description = ?, date = ?, image_url = ? 
    WHERE id = ?
  `;
  try {
    const [result] = await db.execute(query, [
      title,
      description,
      date,
      image_url,
      id,
    ]);
    return result;
  } catch (err) {
    throw new Error("Error updating event: " + err.message);
  }
};

// Delete event
const deleteEvent = async (id) => {
  try {
    const [result] = await db.execute("DELETE FROM events WHERE id = ?", [id]);
    return result;
  } catch (err) {
    throw new Error("Error deleting event: " + err.message);
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
