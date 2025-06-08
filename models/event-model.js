// models/eventModel.js
const db = require("../config/db"); // Import the database pool

// Create Event (returns a Promise)
async function createEvent(eventData) {
    const {
        title,
        description,
        date,
        time,
        location,
        image_url,
        is_paid,
        price
    } = eventData;

    const [result] = await db.execute(
        `INSERT INTO events 
         (title, description, date, time, location, image_url, is_paid, price)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            title,
            description ?? null,
            date,
            time ?? null,
            location,
            image_url ?? null,
            is_paid ? 1 : 0,
            price ?? null
        ]
    );
    return result;
}

// Get all events
async function getAllEvents() {
    try {
        const [rows] = await db.execute("SELECT * FROM events ORDER BY date DESC");
        return rows;
    } catch (err) {
        throw new Error("Error fetching events: " + err.message);
    }
}

// Get event by ID
async function getEventById(id) {
    try {
        const [rows] = await db.execute(
            "SELECT * FROM events WHERE id = ?", 
            [id]
        );
        return rows.length ? rows[0] : null;
    } catch (err) {
        throw new Error("Error fetching event by ID: " + err.message);
    }
}

// Update event
async function updateEvent(id, eventData) {
    const {
        title,
        description,
        date,
        time,
        location,
        image_url,
        is_paid,
        price
    } = eventData;

    const query = `
        UPDATE events
        SET title = ?, 
            description = ?, 
            date = ?, 
            time = ?, 
            location = ?, 
            image_url = ?, 
            is_paid = ?, 
            price = ?
        WHERE id = ?
    `;

    try {
        const [result] = await db.execute(query, [
            title,
            description ?? null,
            date,
            time ?? null,
            location,
            image_url ?? null,
            is_paid ? 1 : 0,
            price ?? null,
            id
        ]);
        return result;
    } catch (err) {
        throw new Error("Error updating event: " + err.message);
    }
}

// Delete event
async function deleteEvent(id) {
    try {
        const [result] = await db.execute(
            "DELETE FROM events WHERE id = ?", 
            [id]
        );
        return result;
    } catch (err) {
        throw new Error("Error deleting event: " + err.message);
    }
}
// Add registration to database
const createRegistration = async ({ event_id, event_title, name, email, phone, notes }) => {
  const query = `
    INSERT INTO registrations (event_id, event_title, name, email, phone, notes, created_at)
    VALUES (?, ?, ?, ?, ?, ?, NOW())
  `;
  const values = [event_id, event_title, name, email, phone, notes || null];
  const [result] = await db.execute(query, values);
  return result;
};
const deleteRegistration = (id) => {
  return db.query("DELETE FROM registrations WHERE id = ?", [id]);
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