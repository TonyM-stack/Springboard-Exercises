// routes/authRoutes.js
const express = require("express");
const { register, login } = require("../controllers/authController");

// (Optional) If you're using Zod-based validation middleware:
const { z } = require("zod");
const { validate } = require("../middlewares/validate");

const router = express.Router();

/**
 * AUTH ROUTES
 * -----------
 * These are intentionally PUBLIC (no requireAuth), because you need to
 * create a user and obtain a JWT before you can call protected endpoints.
 */

// Minimal payload validation using Zod (optional but recommended)
const creds = z.object({
  username: z.string().min(3, "Username must be at least 3 chars"),
  password: z.string().min(6, "Password must be at least 6 chars"),
});

// POST /api/auth/register
// Creates a user (hashes password in the controller) and returns a JWT.
router.post("/register", validate(creds), register);

// POST /api/auth/login
// Verifies credentials and returns a JWT.
router.post("/login", validate(creds), login);

/**
 * How it’s mounted (in app.js):
 *   const authRoutes = require("./routes/authRoutes");
 *   app.use("/api/auth", authRoutes);
 *
 * Full paths:
 *   POST /api/auth/register
 *   POST /api/auth/login
 *
 * Quick tests:
 *   curl -X POST http://localhost:4000/api/auth/register \
 *     -H "Content-Type: application/json" \
 *     -d '{"username":"alice","password":"password123"}'
 *
 *   curl -X POST http://localhost:4000/api/auth/login \
 *     -H "Content-Type: application/json" \
 *     -d '{"username":"alice","password":"password123"}'
 */

module.exports = router;

