const mongoose = require("mongoose");

const highlightSchema = new mongoose.Schema({
  brand: { type: String, default: "HackerRank" },
  badgeSub: { type: String, default: "VIIT CHAPTER" },
  titlePrefix: { type: String, default: "Exclusive" },
  titleAccent: { type: String, required: true },
  description: { type: String, required: true },
  buttonText: { type: String, default: "Book Now" },
  buttonLink: { type: String, default: "#events" },
  image: { type: String, required: true },
  order: { type: Number, default: 0 }
});

module.exports = mongoose.model("Highlight", highlightSchema);
