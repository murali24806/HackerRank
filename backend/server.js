require("dotenv").config();
process.on('uncaughtException', err => { console.error('UNCAUGHT EXCEPTION:', err); process.exit(1); });
process.on('unhandledRejection', err => { console.error('UNHANDLED REJECTION:', err); process.exit(1); });
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoute = require("./routes/auth");
const eventsRoute = require("./routes/events");
const highlightsRoute = require("./routes/highlights");
const teamRoute = require("./routes/team");
const galleryRoute = require("./routes/gallery");
const applicationsRoute = require("./routes/applications");
const uploadRoute = require("./routes/upload");
const announcementsRoute = require("./routes/announcements");

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "https://hackerrankviit.vercel.app"
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));
app.use(express.json());

// Root Route
app.get("/", (req, res) => {
  res.send("Welcome to the HackerRank VIIT Backend API!");
});

// Health Check API
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "HackerRank VIIT Backend API",
    db: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    timestamp: new Date().toISOString()
  });
});

// Register API Routes
app.use("/api/auth", authRoute);
app.use("/api/events", eventsRoute);
app.use("/api/highlights", highlightsRoute);
app.use("/api/team", teamRoute);
app.use("/api/gallery", galleryRoute);
app.use("/api/applications", applicationsRoute);
app.use("/api/upload", uploadRoute);
app.use("/api/announcements", announcementsRoute);

async function startServer() {
  const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/hackerrank_viit";
  try {
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
    console.log("Connected to MongoDB successfully");
  } catch (err) {
    console.warn("MongoDB connection warning:", err.message);
    console.warn("API running in resilient fallback mode (serving structured data directly).");
  }

  app.listen(PORT, () => {
    console.log(`Backend API listening on http://localhost:${PORT}`);
  });
}

startServer();
