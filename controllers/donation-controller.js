const donationModel = require("../models/donation-model");

// Create Donation
const createDonation = async (req, res) => {
  const { donor_name, email, amount, message } = req.body;
  const donationData = { donor_name, email, amount, message };

  try {
    const result = await donationModel.createDonation(donationData);
    return res.status(201).json({
      message: "Donation created successfully",
      donationId: result.insertId,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to create donation",
      error: err.message,
    });
  }
};

// Get All Donations
const getAllDonations = async (req, res) => {
  try {
    const donations = await donationModel.getAllDonations();
    return res.status(200).json(donations);
  } catch (err) {
    return res.status(500).json({
      message: "Failed to fetch donations",
      error: err.message,
    });
  }
};

// Get Donation by ID
const getDonationById = async (req, res) => {
  const { id } = req.params;
  try {
    const donation = await donationModel.getDonationById(id);
    if (donation.length === 0) {
      return res.status(404).json({ message: "Donation not found" });
    }
    return res.status(200).json(donation[0]);
  } catch (err) {
    return res.status(500).json({
      message: "Failed to fetch donation",
      error: err.message,
    });
  }
};

// Update Donation
const updateDonation = async (req, res) => {
  const { id } = req.params;
  const { donor_name, email, amount, message } = req.body;
  const donationData = { donor_name, email, amount, message };

  try {
    const result = await donationModel.updateDonation(id, donationData);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Donation not found" });
    }
    return res.status(200).json({ message: "Donation updated successfully" });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to update donation",
      error: err.message,
    });
  }
};

// Delete Donation
const deleteDonation = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await donationModel.deleteDonation(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Donation not found" });
    }
    return res.status(200).json({ message: "Donation deleted successfully" });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to delete donation",
      error: err.message,
    });
  }
};

module.exports = {
  createDonation,
  getAllDonations,
  getDonationById,
  updateDonation,
  deleteDonation,
};
