// routes/dogRoutes.js
const express = require("express");
const { requireAuth } = require("../middlewares/auth");
const {
  listRegisteredDogs,   // GET   /api/dogs
  registerDog,          // POST  /api/dogs
  removeDog,            // DELETE /api/dogs/:id
  adoptDog,             // POST  /api/dogs/:id/adopt
  listAdoptedDogs       // GET   /api/dogs/me/adopted
} = require("../controllers/dogsController");

// (Optional) Zod validation if you use the validate middleware
const { z } = require("zod");
const { validate } = require("../middlewares/validate");

const router = express.Router();

/**
 * Router-level auth guard
 * -----------------------
 * All dog endpoints are private in this design: you must send a valid
 * Authorization: Bearer <token> header. If you want public read-only
 * access (e.g., list available dogs), place that route BEFORE this line.
 */
router.use(requireAuth);

/**
 * GET /api/dogs
 * -------------
 * Returns paginated dogs for the authenticated user’s view.
 * Common query params: ?status=available&page=1&limit=10
 */
router.get("/", listRegisteredDogs);

/**
 * POST /api/dogs
 * --------------
 * Creates a dog owned by the authenticated user (req.user.id).
 * Example payload: { "name": "Buddy", "description": "friendly" }
 */
router.post(
  "/",
  validate(
    z.object({
      name: z.string().min(1, "Name is required"),
      description: z.string().optional()
    })
  ),
  registerDog
);

/**
 * DELETE /api/dogs/:id
 * --------------------
 * Allows the owner to remove their own dog (if not already adopted).
 */
router.delete("/:id", removeDog);

/**
 * POST /api/dogs/:id/adopt
 * ------------------------
 * Marks the dog as adopted by the current user (cannot adopt your own dog).
 * Optional payload: { "message": "Thank you!" }
 */
router.post(
  "/:id/adopt",
  validate(
    z.object({
      message: z.string().max(500).optional()
    })
  ),
  adoptDog
);

/**
 * GET /api/dogs/me/adopted
 * ------------------------
 * Lists dogs adopted by the current user.
 */
router.get("/me/adopted", listAdoptedDogs);

/**
 * How it’s mounted (in app.js):
 *   const dogRoutes = require("./routes/dogRoutes");
 *   app.use("/api/dogs", dogRoutes);
 *
 * Full paths:
 *   GET    /api/dogs
 *   POST   /api/dogs
 *   DELETE /api/dogs/:id
 *   POST   /api/dogs/:id/adopt
 *   GET    /api/dogs/me/adopted
 *
 * Quick create + list test:
 *   TOKEN=<paste JWT from /api/auth/login>
 *   curl -X POST http://localhost:4000/api/dogs \
 *     -H "Authorization: Bearer $TOKEN" \
 *     -H "Content-Type: application/json" \
 *     -d '{"name":"Buddy","description":"friendly"}'
 *
 *   curl http://localhost:4000/api/dogs \
 *     -H "Authorization: Bearer $TOKEN"
 */

module.exports = router;

