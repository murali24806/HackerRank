const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  month: { type: String, required: true },
  day: { type: String, required: true },
  tag: { type: String, default: "EVENT" },
  prize: { type: String, default: "" },
  image: { type: String, required: true },
  iconType: { type: String, default: "code" }
}, { timestamps: true });

module.exports = mongoose.model("Event", eventSchema);
