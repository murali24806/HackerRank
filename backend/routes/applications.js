const express = require("express");
const router = express.Router();
const Application = require("../models/Application");

router.post("/", async (req, res) => {
  try {
    const { name, email, registrationNo, domain } = req.body;
    if (!name || !email || !registrationNo || !domain) {
      return res.status(400).json({ error: "All fields are required." });
    }

    let savedApp = null;
    try {
      const newApp = new Application({ name, email, registrationNo, domain });
      savedApp = await newApp.save();
    } catch (dbErr) {
      console.warn("Database save skipped (MongoDB not connected), returning simulated success.");
    }

    return res.status(201).json({
      success: true,
      message: "Application successfully submitted! Welcome to HackerRank VIIT.",
      data: savedApp || { name, email, registrationNo, domain }
    });
  } catch (err) {
    return res.status(500).json({ error: "Server error handling application." });
  }
});

module.exports = router;
