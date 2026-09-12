const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login requests per `window` (here, per 15 minutes)
  message: { message: "Too many login attempts from this IP, please try again after 15 minutes" },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * POST /api/auth/login
 * Body: { password: string }
 * Returns: { token: string }
 */
router.post("/login", loginLimiter, (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  const jwtSecret = process.env.JWT_SECRET;

  if (!adminPassword || !jwtSecret) {
    console.error("CRITICAL SECURITY ERROR: ADMIN_PASSWORD or JWT_SECRET is not set in the environment variables.");
    return res.status(500).json({ message: "Internal server configuration error. Login disabled." });
  }

  if (password !== adminPassword) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = jwt.sign({ role: "admin" }, jwtSecret, { expiresIn: "12h" });
  return res.json({ token, message: "Login successful" });
});

/**
 * GET /api/auth/verify
 * Validates an existing token (used by frontend on page load to check session)
 */
router.get("/verify", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ valid: false });

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        console.error("CRITICAL SECURITY ERROR: JWT_SECRET is not set.");
        return res.status(500).json({ valid: false });
    }
    
    const decoded = jwt.verify(token, secret);
    if (decoded.role !== "admin") return res.status(403).json({ valid: false });
    return res.json({ valid: true });
  } catch {
    return res.status(401).json({ valid: false });
  }
});

module.exports = router;
