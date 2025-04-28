// models/adminModel.js
const db = require("../config/db");

// Create new admin user
async function createAdmin(username, email, passwordHash) {
  const [result] = await db.execute(
    "INSERT INTO admin_user (username, email, password_hash) VALUES (?, ?, ?)",
    [username, email, passwordHash]
  );
  return result;
}

// Find admin by email
async function findAdminByEmail(email) {
  const [rows] = await db.execute("SELECT * FROM admin_user WHERE email = ?", [
    email,
  ]);
  return rows[0];
}

module.exports = {
  createAdmin,
  findAdminByEmail,
};
