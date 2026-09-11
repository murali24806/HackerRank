const express = require("express");
const router = express.Router();
const GalleryItem = require("../models/GalleryItem");
const verifyAdmin = require("../middleware/auth");

const fallbackGallery = [
  {
    title: "CodeSprint Grand Arena",
    description: "300+ students hacking overnight at the main auditorium.",
    category: "hackathons",
    image: "/assets/images/gallery1.jpg",
    driveLink: "",
    tag: "Hackathon"
  },
  {
    title: "Algorithms Masterclass",
    description: "Deep dive into recursive algorithms and dynamic programming.",
    category: "workshops",
    image: "/assets/images/gallery2.jpg",
    driveLink: "",
    tag: "Workshop"
  },
  {
    title: "Champion Ceremony",
    description: "Winners taking home the first place trophy and awards.",
    category: "celebrations",
    image: "/assets/images/gallery3.jpg",
    driveLink: "",
    tag: "Celebration"
  },
  {
    title: "Cybersecurity Arena",
    description: "Students solving reverse engineering flags and network riddles.",
    category: "hackathons",
    image: "/assets/images/gallery4.jpg",
    driveLink: "",
    tag: "CTF Arena"
  }
];

// GET all gallery items
router.get("/", async (req, res) => {
  try {
    const items = await GalleryItem.find();
    if (items && items.length > 0) {
      return res.json(items);
    }
    return res.json(fallbackGallery);
  } catch (err) {
    return res.json(fallbackGallery);
  }
});

// POST create gallery item (admin)
router.post("/", verifyAdmin, async (req, res) => {
  try {
    const item = new GalleryItem(req.body);
    await item.save();
    return res.status(201).json(item);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

// PUT update gallery item (admin)
router.put("/:id", verifyAdmin, async (req, res) => {
  try {
    const item = await GalleryItem.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ message: "Gallery item not found" });
    return res.json(item);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

// DELETE gallery item (admin)
router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    await GalleryItem.findByIdAndDelete(req.params.id);
    return res.json({ message: "Gallery item deleted successfully" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

module.exports = router;
