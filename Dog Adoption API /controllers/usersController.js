const bcrypt = require("bcrypt");
const User = require("../models/User");

async function getMe(req, res, next) {
  try {
    const user = await User.findById(req.user.id).select("_id username createdAt updatedAt");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (e) { next(e); }
}

async function getUserById(req, res, next) {
  try {
    const user = await User.findById(req.params.id).select("_id username createdAt updatedAt");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (e) { next(e); }
}

async function updateMe(req, res, next) {
  try {
    const { username, password } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (username) {
      const exists = await User.findOne({ username });
      if (exists && exists._id.toString() !== user._id.toString()) {
        return res.status(409).json({ error: "Username already taken" });
      }
      user.username = username;
    }

    if (password) {
      const saltRounds = 10;
      user.passwordHash = await bcrypt.hash(password, saltRounds);
    }

    await user.save();
    res.json({ id: user._id, username: user.username, updatedAt: user.updatedAt });
  } catch (e) { next(e); }
}

async function deleteMe(req, res, next) {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    await user.deleteOne();
    res.json({ success: true });
  } catch (e) { next(e); }
}

module.exports = { getMe, getUserById, updateMe, deleteMe };
