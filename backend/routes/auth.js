const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

/**
 * POST /api/auth/login
 * Body: { password: string }
 * Returns: { token: string }
 */
router.post("/login", (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  const adminPassword = process.env.ADMIN_PASSWORD || "hackerrank_viit_2026";
  const jwtSecret = process.env.JWT_SECRET || "default_secret";

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
    const secret = process.env.JWT_SECRET || "default_secret";
    const decoded = jwt.verify(token, secret);
    if (decoded.role !== "admin") return res.status(403).json({ valid: false });
    return res.json({ valid: true });
  } catch {
    return res.status(401).json({ valid: false });
  }
});

module.exports = router;
