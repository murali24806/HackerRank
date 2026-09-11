const express = require("express");
const router = express.Router();
const TeamMember = require("../models/TeamMember");

const fallbackTeam = [
  {
    name: "Savvana Lohitha",
    role: "Lead",
    badgeClass: "badge-lead",
    bio: "Spearheading HackerRank VIIT chapter initiatives, strategic events, and fostering a strong coding culture across campus.",
    avatar: "/assets/images/lead.jpeg",
    nodePosition: "right",
    socials: { github: "https://github.com", linkedin: "https://linkedin.com", twitter: "https://twitter.com" }
  },
  {
    name: "Jyothirmai Seepana",
    role: "Co-Lead",
    badgeClass: "badge-tech",
    bio: "Co-leading chapter operations, coordinating between teams, and driving impactful hackathon and community programs.",
    avatar: "/assets/images/colead.jpeg",
    nodePosition: "left",
    socials: { github: "https://github.com", linkedin: "https://linkedin.com", twitter: "https://twitter.com" }
  },
  {
    name: "Madhusudhan Pelluri",
    role: "CP / DSA Lead",
    badgeClass: "badge-code",
    bio: "Curating competitive programming contests, DSA workshops, and problem-set challenges to sharpen algorithmic thinking.",
    avatar: "/assets/images/cplead.jpeg",
    nodePosition: "right",
    socials: { github: "https://github.com", linkedin: "https://linkedin.com", twitter: "https://twitter.com" }
  },
  {
    name: "Murali Patnala",
    role: "Social Media Manager",
    badgeClass: "badge-design",
    bio: "Managing the chapter's digital presence, growing community engagement across platforms, and creating viral tech content.",
    avatar: "/assets/images/sociallead.jpeg",
    nodePosition: "left",
    socials: { github: "https://github.com", linkedin: "https://linkedin.com", twitter: "https://twitter.com" }
  },
  {
    name: "Anjan Panga",
    role: "Web Dev Lead",
    badgeClass: "badge-code",
    bio: "Leading the development of chapter platforms, hackathon portals, and full-stack projects that power the VIIT community.",
    avatar: "/assets/images/weblead.jpeg",
    nodePosition: "right",
    socials: { github: "https://github.com", linkedin: "https://linkedin.com", twitter: "https://twitter.com" }
  },
  {
    name: "Sai Samshitha Jyothi Amujuri",
    role: "Event Manager",
    badgeClass: "badge-event",
    bio: "Planning and executing chapter events end-to-end — from workshops to large-scale hackathons — with precision and creativity.",
    avatar: "/assets/images/eventlead.jpeg",
    nodePosition: "left",
    socials: { github: "https://github.com", linkedin: "https://linkedin.com", twitter: "https://twitter.com" }
  },
  {
    name: "Uma Pathi Raja Pallempati",
    role: "Tech Lead",
    badgeClass: "badge-tech",
    bio: "Driving technical innovation within the chapter, mentoring members on advanced concepts, and leading the core engineering team.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=umapathi&backgroundColor=0e141e",
    nodePosition: "right",
    socials: { github: "https://github.com", linkedin: "https://linkedin.com", twitter: "https://twitter.com" }
  },
  {
    name: "Manohar Nalla",
    role: "Graphic Designer",
    badgeClass: "badge-design",
    bio: "Crafting stunning visual designs, branding assets, and creatives that define the HackerRank VIIT chapter identity.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=manoha&backgroundColor=0e141e",
    nodePosition: "left",
    socials: { github: "https://github.com", linkedin: "https://linkedin.com", twitter: "https://twitter.com" }
  },
  {
    name: "Sharat Chandra Reddy Parapati",
    role: "Content Creator",
    badgeClass: "badge-code",
    bio: "Producing engaging technical content, blogs, and educational resources that inspire and inform the campus coding community.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sharat&backgroundColor=0e141e",
    nodePosition: "right",
    socials: { github: "https://github.com", linkedin: "https://linkedin.com", twitter: "https://twitter.com" }
  },
  {
    name: "Phani Sasi Kiran Mamillapalli",
    role: "Community Manager",
    badgeClass: "badge-community",
    bio: "Building and nurturing a thriving student community, fostering peer learning, and connecting members with opportunities.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=phani&backgroundColor=0e141e",
    nodePosition: "left",
    socials: { github: "https://github.com", linkedin: "https://linkedin.com", twitter: "https://twitter.com" }
  }
];

router.get("/", async (req, res) => {
  try {
    const team = await TeamMember.find().sort({ order: 1 });
    if (team && team.length > 0) {
      return res.json(team);
    }
    return res.json(fallbackTeam);
  } catch (err) {
    return res.json(fallbackTeam);
  }
});

module.exports = router;
