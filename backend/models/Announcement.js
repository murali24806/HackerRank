const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  tag: { type: String, default: "UPDATE" },
  tagColor: { type: String, default: "#3b82f6" },
  time: { type: String, default: "Now" },
  link: { type: String, default: "" },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Announcement", announcementSchema);
