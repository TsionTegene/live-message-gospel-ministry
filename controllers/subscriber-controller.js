const subscriberModel = require("../models/subscriber-model");

// Create a new subscriber
const createSubscriber = async (req, res) => {
  const { email } = req.body;

  // Check if the email is already subscribed
  const existingSubscriber = await subscriberModel.isEmailSubscribed(email);
  if (existingSubscriber) {
    return res.status(400).json({ message: "Email already subscribed" });
  }

  try {
    const result = await subscriberModel.createSubscriber(email);
    return res.status(201).json({
      message: "Subscriber added successfully",
      subscriberId: result.insertId,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error subscribing",
      error: err.message,
    });
  }
};

// Get all subscribers
const getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await subscriberModel.getAllSubscribers();
    return res.status(200).json(subscribers);
  } catch (err) {
    return res.status(500).json({
      message: "Error fetching subscribers",
      error: err.message,
    });
  }
};

// Delete subscriber by email
const deleteSubscriber = async (req, res) => {
  const { email } = req.params;

  try {
    const result = await subscriberModel.deleteSubscriber(email);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Subscriber not found" });
    }
    return res.status(200).json({ message: "Subscriber deleted successfully" });
  } catch (err) {
    return res.status(500).json({
      message: "Error deleting subscriber",
      error: err.message,
    });
  }
};

module.exports = {
  createSubscriber,
  getAllSubscribers,
  deleteSubscriber,
};
