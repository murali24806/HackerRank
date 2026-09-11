const express = require("express");
const router = express.Router();
const Highlight = require("../models/Highlight");
const verifyAdmin = require("../middleware/auth");

const fallbackHighlights = [
  {
    brand: "HackerRank",
    badgeSub: "VIIT CHAPTER",
    titlePrefix: "Exclusive",
    titleAccent: "VIITHACKS26",
    description: "Enjoy more value on every contest • ₹50,000 Cash Pool",
    buttonText: "Book Now",
    buttonLink: "#events",
    image: "/assets/images/slide1.jpg"
  },
  {
    brand: "HackerRank",
    badgeSub: "ALGO LABS",
    titlePrefix: "Masterclass",
    titleAccent: "CAMPUS26",
    description: "Dynamic programming & system design with MAANG mentors",
    buttonText: "Explore Now",
    buttonLink: "#events",
    image: "/assets/images/slide2.jpg"
  },
  {
    brand: "HackerRank",
    badgeSub: "VICTORIOUS",
    titlePrefix: "Champions",
    titleAccent: "VIIT WINS",
    description: "VIIT finalists taking 1st place in National Hackathon Series",
    buttonText: "View Gallery",
    buttonLink: "#gallery",
    image: "/assets/images/slide3.jpg"
  }
];

// GET all highlights
router.get("/", async (req, res) => {
  try {
    const highlights = await Highlight.find().sort({ order: 1 });
    if (highlights && highlights.length > 0) return res.json(highlights);
    return res.json(fallbackHighlights);
  } catch (err) {
    return res.json(fallbackHighlights);
  }
});

// POST create highlight (admin)
router.post("/", verifyAdmin, async (req, res) => {
  try {
    const highlight = new Highlight(req.body);
    await highlight.save();
    return res.status(201).json(highlight);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

// PUT update highlight (admin)
router.put("/:id", verifyAdmin, async (req, res) => {
  try {
    const highlight = await Highlight.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!highlight) return res.status(404).json({ message: "Not found" });
    return res.json(highlight);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

// DELETE highlight (admin)
router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    await Highlight.findByIdAndDelete(req.params.id);
    return res.json({ message: "Deleted successfully" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

module.exports = router;
