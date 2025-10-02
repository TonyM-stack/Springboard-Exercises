const express = require("express");
const { requireAuth } = require("../middlewares/auth");
const { myAdoptions } = require("../controllers/adoptionsController");

const router = express.Router();

router.use(requireAuth);

// GET /api/adoptions/me
router.get("/me", myAdoptions);

module.exports = router;
