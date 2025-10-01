const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

function sign(user) {
  return jwt.sign(
    { sub: user._id.toString(), username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "24h" }
  );
}

async function register(req, res, next) {
  try {
    const { username, password } = req.body;

       // minimal validation (keep Zod or replace with this)
    if (!username || username.length < 3) {
      return res.status(400).json({ error: "Username must be at least 3 characters" });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    const exists = await User.findOne({ username });
    if (exists) return res.status(409).json({ error: "Username already taken" });

       //  hash directly here (don’t rely on virtual)
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, passwordHash });

    const token = sign(user);
    res.status(201).json({ token, user: { id: user._id, username: user.username } });
  } catch (e) { next(e); }
}

async function login(req, res, next) {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user || !(await user.verifyPassword(password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    
    const token = sign(user);
    res.json({ token, user: { id: user._id, username: user.username } });
  } catch (e) { next(e); }
}

module.exports = { register, login };
