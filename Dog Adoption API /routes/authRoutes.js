const express = require("express");
const { z } = require("zod");
const { register, login } = require("../controllers/authController");
const { validate } = require("../middlewares/validate");

const router = express.Router();

const creds = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
});

router.post("/register", validate(creds), register);
router.post("/login", validate(creds), login);
router.get("/_health", (req, res) => res.json({ alive: true }));


module.exports = router;
