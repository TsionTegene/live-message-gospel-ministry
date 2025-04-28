const db = require("../config/db"); // Import the pool

// Create Donation function (returns a Promise)
async function createDonation(donationData) {
  const { donor_name, email, amount, message } = donationData;
  const [result] = await db.execute(
    "INSERT INTO donations (donor_name, email, amount, message) VALUES (?, ?, ?, ?)",
    [donor_name, email, amount, message]
  );
  return result;
}

// Get all donations
const getAllDonations = async () => {
  try {
    const [rows] = await db.execute("SELECT * FROM donations");
    return rows;
  } catch (err) {
    throw new Error("Error fetching donations: " + err.message);
  }
};

// Get donation by ID
const getDonationById = async (id) => {
  try {
    const [rows] = await db.execute("SELECT * FROM donations WHERE id = ?", [
      id,
    ]);
    return rows;
  } catch (err) {
    throw new Error("Error fetching donation by ID: " + err.message);
  }
};

// Update donation
const updateDonation = async (id, donationData) => {
  const { donor_name, email, amount, message } = donationData;
  const query = `
    UPDATE donations 
    SET donor_name = ?, email = ?, amount = ?, message = ? 
    WHERE id = ?
  `;
  try {
    const [result] = await db.execute(query, [
      donor_name,
      email,
      amount,
      message,
      id,
    ]);
    return result;
  } catch (err) {
    throw new Error("Error updating donation: " + err.message);
  }
};

// Delete donation
const deleteDonation = async (id) => {
  try {
    const [result] = await db.execute("DELETE FROM donations WHERE id = ?", [
      id,
    ]);
    return result;
  } catch (err) {
    throw new Error("Error deleting donation: " + err.message);
  }
};

module.exports = {
  createDonation,
  getAllDonations,
  getDonationById,
  updateDonation,
  deleteDonation,
};
