const express = require("express");
const { requireAuth } = require("../middlewares/auth");
const {
  getMe,
  getUserById,
  updateMe,
  deleteMe,
} = require("../controllers/usersController");

const router = express.Router();

router.use(requireAuth);

// current user profile
router.get("/me", getMe);
router.patch("/me", updateMe);
router.delete("/me", deleteMe);

// public profile by ID
router.get("/:id", getUserById);

module.exports = router;
