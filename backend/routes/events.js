const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const verifyAdmin = require("../middleware/auth");

const fallbackEvents = [
  {
    id: "codesprint",
    title: "CodeSprint 2026: Campus Royale",
    description: "Annual 5-round competitive programming royale with live college ranklist and recruitment fast-tracks.",
    month: "OCT",
    day: "15",
    tag: "FLAGSHIP CONTEST",
    prize: "₹25,000 PRIZES",
    image: "/assets/images/event1.jpg",
    iconType: "code"
  },
  {
    id: "dsa-bootcamp",
    title: "DSA & System Design Mastery",
    description: "Deep dive into Trees, Graphs, Dynamic Programming and distributed systems designed for MAANG rounds.",
    month: "OCT",
    day: "22",
    tag: "BOOTCAMP",
    prize: "INTERVIEW PREP",
    image: "/assets/images/event2.jpg",
    iconType: "laptop"
  },
  {
    id: "hackthecampus",
    title: "HackTheCampus 36-Hour Hackathon",
    description: "Build disruptive AI, Web3, and IoT solutions with guidance from senior engineering architects.",
    month: "NOV",
    day: "05",
    tag: "36-HOUR HACKATHON",
    prize: "SWAGS",
    image: "/assets/images/event3.jpg",
    iconType: "fire"
  },
  {
    id: "cyber-ctf",
    title: "Campus CTF & Bug Bounty Arena",
    description: "Binary exploitation, web vulnerabilities, cryptography, and real-time capture-the-flag competitions.",
    month: "NOV",
    day: "19",
    tag: "CYBERSECURITY",
    prize: "CTF",
    image: "/assets/images/gallery4.jpg",
    iconType: "shield"
  },
  {
    id: "ai-symposium",
    title: "AI & Neural Networks Symposium",
    description: "Hands-on model training, neural architectures, PyTorch pipelines, and LLM fine-tuning demos.",
    month: "DEC",
    day: "03",
    tag: "AI & DEEP LEARNING",
    prize: "CERTIFICATE",
    image: "/assets/images/gallery2.jpg",
    iconType: "brain"
  }
];

// GET all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: 1 });
    if (events && events.length > 0) {
      return res.json(events);
    }
    return res.json(fallbackEvents);
  } catch (err) {
    return res.json(fallbackEvents);
  }
});

// POST create event (admin)
router.post("/", verifyAdmin, async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    return res.status(201).json(event);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

// PUT update event (admin)
router.put("/:id", verifyAdmin, async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!event) return res.status(404).json({ message: "Event not found" });
    return res.json(event);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

// DELETE event (admin)
router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    return res.json({ message: "Event deleted successfully" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

module.exports = router;
