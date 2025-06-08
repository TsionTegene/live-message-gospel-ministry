const db = require("../config/db");

const createRegistration = async ({ event_id, name, email, phone, notes }) => {
  const [result] = await db.execute(
    "INSERT INTO registrations (event_id, name, email, phone, notes) VALUES (?, ?, ?, ?, ?)",
    [event_id, name, email, phone, notes]
  );
  return result;
};

const getAllRegistrations = async () => {
  const [rows] = await db.execute(
    `SELECT r.*, e.title as event_title
     FROM registrations r
     JOIN events e ON r.event_id = e.id`
  );
  return rows;
};

module.exports = { createRegistration, getAllRegistrations };
