const mongoose = require("mongoose");

const galleryItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  driveLink: { type: String, default: "" },
  tag: { type: String, default: "Event" }
});

module.exports = mongoose.model("GalleryItem", galleryItemSchema);
