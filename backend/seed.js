require("dotenv").config();
const mongoose = require("mongoose");
const Event = require("./models/Event");
const Highlight = require("./models/Highlight");
const TeamMember = require("./models/TeamMember");
const GalleryItem = require("./models/GalleryItem");

const events = [
  {
    title: "CodeSprint 2026: Campus Royale",
    description: "Annual 5-round competitive programming royale with live college ranklist and recruitment fast-tracks.",
    month: "OCT",
    day: "15",
    tag: "FLAGSHIP CONTEST",
    prize: "₹25,000 PRIZES",
    image: "/assets/images/event1.jpg",
    iconType: "code"
  },
  {
    title: "DSA & System Design Mastery",
    description: "Deep dive into Trees, Graphs, Dynamic Programming and distributed systems designed for MAANG rounds.",
    month: "OCT",
    day: "22",
    tag: "BOOTCAMP",
    prize: "INTERVIEW PREP",
    image: "/assets/images/event2.jpg",
    iconType: "laptop"
  },
  {
    title: "HackTheCampus 36-Hour Hackathon",
    description: "Build disruptive AI, Web3, and IoT solutions with guidance from senior engineering architects.",
    month: "NOV",
    day: "05",
    tag: "36-HOUR HACKATHON",
    prize: "SWAGS",
    image: "/assets/images/event3.jpg",
    iconType: "fire"
  },
  {
    title: "Campus CTF & Bug Bounty Arena",
    description: "Binary exploitation, web vulnerabilities, cryptography, and real-time capture-the-flag competitions.",
    month: "NOV",
    day: "19",
    tag: "CYBERSECURITY",
    prize: "CTF",
    image: "/assets/images/gallery4.jpg",
    iconType: "shield"
  },
  {
    title: "AI & Neural Networks Symposium",
    description: "Hands-on model training, neural architectures, PyTorch pipelines, and LLM fine-tuning demos.",
    month: "DEC",
    day: "03",
    tag: "AI & DEEP LEARNING",
    prize: "CERTIFICATE",
    image: "/assets/images/gallery2.jpg",
    iconType: "brain"
  }
];

const highlights = [
  {
    brand: "HackerRank",
    badgeSub: "VIIT CHAPTER",
    titlePrefix: "Exclusive",
    titleAccent: "VIITHACKS26",
    description: "Enjoy more value on every contest • ₹50,000 Cash Pool",
    buttonText: "Book Now",
    buttonLink: "#events",
    image: "/assets/images/slide1.jpg",
    order: 0
  },
  {
    brand: "HackerRank",
    badgeSub: "ALGO LABS",
    titlePrefix: "Masterclass",
    titleAccent: "CAMPUS26",
    description: "Dynamic programming & system design with MAANG mentors",
    buttonText: "Explore Now",
    buttonLink: "#events",
    image: "/assets/images/slide2.jpg",
    order: 1
  },
  {
    brand: "HackerRank",
    badgeSub: "VICTORIOUS",
    titlePrefix: "Champions",
    titleAccent: "VIIT WINS",
    description: "VIIT finalists taking 1st place in National Hackathon Series",
    buttonText: "View Gallery",
    buttonLink: "#gallery",
    image: "/assets/images/slide3.jpg",
    order: 2
  }
];

const team = [
  {
    name: "Alex Mercer",
    role: "Chapter Lead • President",
    badgeClass: "badge-lead",
    bio: "Leading chapter initiatives, strategic hackathons, and corporate alliances. Passionate competitive coder (Guardian on LeetCode).",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex&backgroundColor=0e141e",
    nodePosition: "right",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com"
    },
    order: 0
  },
  {
    name: "Sarah Chen",
    role: "Vice President • Operations",
    badgeClass: "badge-tech",
    bio: "Overseeing event executions, chapter logistics, and student mentoring programs. Active open-source contributor and full-stack dev.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah&backgroundColor=0e141e",
    nodePosition: "left",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com"
    },
    order: 1
  },
  {
    name: "Rahul Sharma",
    role: "Technical Lead",
    badgeClass: "badge-code",
    bio: "Architecting contest problem statements, test cases, and cloud infrastructure for campus judge platforms. HackerRank 6-Star Coder.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rahul&backgroundColor=0e141e",
    nodePosition: "right",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com"
    },
    order: 2
  },
  {
    name: "Emily Davis",
    role: "Design & UI/UX Lead",
    badgeClass: "badge-design",
    bio: "Crafting modern, intuitive interfaces and visual branding for HackerRank VIIT campaigns, websites, and community hackathons.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily&backgroundColor=0e141e",
    nodePosition: "left",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com"
    },
    order: 3
  }
];

const gallery = [
  {
    title: "CodeSprint Grand Arena",
    description: "300+ students hacking overnight at the main auditorium.",
    category: "hackathons",
    image: "/assets/images/gallery1.jpg",
    tag: "Hackathon"
  },
  {
    title: "Algorithms Masterclass",
    description: "Deep dive into recursive algorithms and dynamic programming.",
    category: "workshops",
    image: "/assets/images/gallery2.jpg",
    tag: "Workshop"
  },
  {
    title: "Champion Ceremony",
    description: "Winners taking home the first place trophy and awards.",
    category: "celebrations",
    image: "/assets/images/gallery3.jpg",
    tag: "Celebration"
  },
  {
    title: "Cybersecurity Arena",
    description: "Students solving reverse engineering flags and network riddles.",
    category: "hackathons",
    image: "/assets/images/gallery4.jpg",
    tag: "CTF Arena"
  }
];

async function seed() {
  const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/hackerrank_viit";
  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB for seeding...");

    await Event.deleteMany({});
    await Event.insertMany(events);
    console.log("Seeded Events");

    await Highlight.deleteMany({});
    await Highlight.insertMany(highlights);
    console.log("Seeded Highlights");

    await TeamMember.deleteMany({});
    await TeamMember.insertMany(team);
    console.log("Seeded Team Members");

    await GalleryItem.deleteMany({});
    await GalleryItem.insertMany(gallery);
    console.log("Seeded Gallery");

    console.log("Seeding finished successfully!");
  } catch (err) {
    console.error("Seeding failed (MongoDB might not be running):", err.message);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
