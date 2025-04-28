// server.js
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin-user-route");
const eventRoutes = require("./routes/event-route");
const donationRoutes = require("./routes/donation-route");
const contactMessageRoutes = require("./routes/contact-message-route");
const subscribeRoutes = require("./routes/subscriber-route");
const postRoutes = require("./routes/post-route");

// Load env
dotenv.config();

// Initialize app
const app = express();

// Middlewares
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/donation", donationRoutes);
app.use("/api/contact-messages", contactMessageRoutes);
app.use("/api/subscriber", subscribeRoutes);
app.use("/api/post", postRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
