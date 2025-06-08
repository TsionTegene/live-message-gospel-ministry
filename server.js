// server.js
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");

const adminRoutes = require("./routes/admin-user-route");
const eventRoutes = require("./routes/event-route");
const donationRoutes = require("./routes/donation-route");
const contactMessageRoutes = require("./routes/contact-message-route");
const subscribeRoutes = require("./routes/subscriber-route");
const postRoutes = require("./routes/post-route");
const registrationRoutes = require("./routes/registration-route");
// Load env
dotenv.config();

// Initialize app
const app = express();

const corsOptions = {
  origin: 'https://live-message-frontend.onrender.com/',
  credentials:true,
  methods: ['GET','POST','PUT','DELETE'],
};
app.use(cors(corsOptions));
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
app.use("/api/registrations", registrationRoutes);
// Start server
const PORT = process.env.PORT || 8000;
const path = require("path");

// Serve Vite static files
// app.use(express.static(path.join(__dirname, "../mission-connect-hub/dist")));

// const indexPath = path.join(__dirname, "../mission-connect-hub/dist/index.html");
// console.log("Resolved index.html path:", indexPath);


// app.get("/", (req, res) => {
// const indexPath = path.join(__dirname, "../mission-connect-hub/dist/index.html");
//   console.log("Serving frontend from:", indexPath);
//   res.sendFile(indexPath);
// });




app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
