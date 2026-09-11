const express = require("express");
const router = express.Router();
const Announcement = require("../models/Announcement");
const verifyAdmin = require("../middleware/auth");

// GET all active announcements
router.get("/", async (req, res) => {
  try {
    const announcements = await Announcement.find({ active: true }).sort({ createdAt: -1 });
    return res.json(announcements);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// GET all announcements (for admin panel)
router.get("/all", verifyAdmin, async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    return res.json(announcements);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// POST create announcement (admin)
router.post("/", verifyAdmin, async (req, res) => {
  try {
    const announcement = new Announcement(req.body);
    await announcement.save();
    return res.status(201).json(announcement);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

// PUT update announcement (admin)
router.put("/:id", verifyAdmin, async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!announcement) return res.status(404).json({ message: "Not found" });
    return res.json(announcement);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

// DELETE announcement (admin)
router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    return res.json({ message: "Deleted successfully" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

module.exports = router;
