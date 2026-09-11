const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({
  text: { type: String, required: true },
  link: { type: String, default: "" },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Announcement", announcementSchema);
