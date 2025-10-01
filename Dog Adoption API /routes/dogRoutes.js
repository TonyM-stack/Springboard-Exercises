const express = require("express");
const { z } = require("zod");
const { requireAuth } = require("../middlewares/auth");
const { validate } = require("../middlewares/validate");
const {
  registerDog,
  removeDog,
  listRegisteredDogs,
  adoptDog,
  listAdoptedDogs,
} = require("../controllers/dogsController");

const router = express.Router();

// all dog routes require authentication
router.use(requireAuth);

// GET /api/dogs?status=&ownerId=&q=&page=&limit=
router.get("/", listRegisteredDogs);

// POST /api/dogs
router.post(
  "/",
  validate(z.object({ name: z.string().min(1), description: z.string().optional() })),
  registerDog
);

// DELETE /api/dogs/:id
router.delete("/:id", removeDog);

// POST /api/dogs/:id/adopt
router.post(
  "/:id/adopt",
  validate(z.object({ message: z.string().optional() })),
  adoptDog
);

// GET /api/dogs/me/adopted
router.get("/me/adopted", listAdoptedDogs);

module.exports = router;
