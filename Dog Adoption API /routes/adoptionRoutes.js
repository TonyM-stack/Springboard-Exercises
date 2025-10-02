// routes/adoptionRoutes.js
const express = require("express");
const { requireAuth } = require("../middlewares/auth");
const { myAdoptions } = require("../controllers/adoptionsController");

const router = express.Router();

/**
 * Router-level auth guard
 * -----------------------
 * Every route defined *after* this line requires a valid JWT.
 * - Expects header:  Authorization: Bearer <token>
 * - On success, sets req.user (e.g., { id, username, ... })
 * - On failure, short-circuits with 401 (Missing/Invalid token)
 *
 * Tip: Apply `requireAuth` here when *all* endpoints in this router
 * are private. If you later add a public route, place it *before*
 * this `router.use(requireAuth)` line or attach `requireAuth` to
 * individual routes instead.
 */
router.use(requireAuth);

/**
 * GET /api/adoptions/me
 * ---------------------
 * Returns the authenticated user's adoptions.
 * The controller typically reads req.user.id and queries by:
 *   { adopter: req.user.id }
 *
 * Example controller shape:
 *   async function myAdoptions(req, res, next) {
 *     try {
 *       const items = await Adoption.find({ adopter: req.user.id })
 *         .populate("dog", "name description status")
 *         .sort("-createdAt")
 *         .lean();
 *       res.json({ items });
 *     } catch (err) { next(err); }
 *   }
 */
router.get("/me", myAdoptions);

module.exports = router;

/**
 * How this router is mounted
 * --------------------------
 * In app.js:
 *   const adoptionRoutes = require("./routes/adoptionRoutes");
 *   app.use("/api/adoptions", adoptionRoutes);
 *
 * Full path becomes:
 *   GET /api/adoptions/me   -> myAdoptions
 *
 * Quick test (with a valid token):
 *   TOKEN=<paste JWT from /api/auth/login>
 *   curl -H "Authorization: Bearer $TOKEN" http://localhost:4000/api/adoptions/me
 *
 * Order matters:
 * - Mount your routes before the 404 and error handlers in app.js.
 * - Example:
 *     app.use("/api/adoptions", adoptionRoutes);
 *     app.use(notFound);
 *     app.use(errorHandler);
 */

