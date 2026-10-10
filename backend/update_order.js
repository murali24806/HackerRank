require("dotenv").config();
const mongoose = require("mongoose");
const TeamMember = require("./models/TeamMember");

const newOrder = [
  "Lohitha Savvana",
  "Jyothirmai Seepana",
  "Madhusudhan Pelluri",
  "Murali Lakshmi Sai Patnala",
  "Anjan Panga",
  "Sai Samshitha Jyothi Amujuri",
  "Uma Pathi Raja Pallempati",
  "Manohar Nalla",
  "Sharat Chandra Reddy Parapati",
  "Phani Sasi Kiran Mamillapalli",
  "Pranathi Korupolu"
];

async function updateOrder() {
  const mongoUri = process.env.MONGODB_URI;
  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB...");

    for (let i = 0; i < newOrder.length; i++) {
      const name = newOrder[i];
      const result = await TeamMember.findOneAndUpdate(
        { name: new RegExp(name, 'i') }, 
        { $set: { order: i + 1 } },
        { new: true }
      );
      if (result) {
        console.log(`Updated ${result.name} to order ${i + 1}`);
      } else {
        console.log(`Could not find ${name} in database.`);
      }
    }
    console.log("Finished updating order.");
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
}

updateOrder();
