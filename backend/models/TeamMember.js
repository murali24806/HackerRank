const mongoose = require("mongoose");

const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  badgeClass: { type: String, default: "badge-lead" },
  bio: { type: String, required: true },
  avatar: { type: String, required: true },
  nodePosition: { type: String, enum: ["right", "left"], default: "right" },
  socials: {
    github: { type: String, default: "https://github.com" },
    linkedin: { type: String, default: "https://linkedin.com" },
    twitter: { type: String, default: "https://twitter.com" }
  },
  order: { type: Number, default: 0 }
});

module.exports = mongoose.model("TeamMember", teamMemberSchema);
