require("dotenv").config();
const mongoose = require("mongoose");
const TeamMember = require("./models/TeamMember");

async function addMember() {
  const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/hackerrank_viit";
  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB...");

    const newMember = new TeamMember({
      name: "Pranathi Korupolu",
      role: "Content Creator",
      badgeClass: "badge-design",
      bio: "Creating engaging technical content, tutorials, and social media campaigns for the HackerRank VIIT community.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=pranathi&backgroundColor=0e141e",
      nodePosition: "right", // or left, can be adjusted
      socials: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com"
      },
      order: 4
    });

    await newMember.save();
    console.log("Successfully added Pranathi Korupolu!");
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
}

addMember();
