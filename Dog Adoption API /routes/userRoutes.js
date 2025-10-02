// routes/userRoutes.js
const express = require("express");
const { requireAuth } = require("../middlewares/auth");
const {
  getMe,       // GET    /api/users/me
  getUserById, // GET    /api/users/:id
  updateMe,    // PATCH  /api/users/me
  deleteMe,    // DELETE /api/users/me
} = require("../controllers/usersController");

const router = express.Router();

/**
 * Auth guard for this router
 * --------------------------
 * Every route defined after this line requires a valid JWT.
 * - Expects header: Authorization: Bearer <token>
 * - On success, middleware sets req.user (e.g., { id, username, ... })
 * - On failure, responds 401 (Missing/Invalid token)
 */
router.use(requireAuth);

/**
 * GET /api/users/me
 * -----------------
 * Returns the authenticated user's profile.
 * Typical controller behavior:
 *  - read req.user.id
 *  - fetch the user (omit sensitive fields like passwordHash)
 *  - res.json({ id, username, createdAt, ... })
 */
router.get("/me", getMe);

/**
 * PATCH /api/users/me
 * -------------------
 * Partially updates the authenticated user's profile.
 * Security tip for the controller:
 *  - Allowlist only safe fields (e.g., { username, bio, avatarUrl })
 *  - Never accept role/permissions in body
 *  - If changing password, require current password and re-hash
 */
router.patch("/me", updateMe);

/**
 * DELETE /api/users/me
 * --------------------
 * Deletes (or deactivates) the authenticated user's account.
 * Common choices:
 *  - Soft delete: set `deletedAt` or `isActive=false`
 *  - Hard delete: remove document (careful with related data)
 */
router.delete("/me", deleteMe);

/**
 * GET /api/users/:id
 * ------------------
 * Returns a user profile by id.
 * NOTE: With router.use(requireAuth) above, this route is PRIVATE too.
 * If you truly want it public, move this route ABOVE router.use(requireAuth)
 * (see Option B below).
 */
router.get("/:id", getUserById);

module.exports = router;

/**
 * Mounting (in app.js)
 * --------------------
 * const userRoutes = require("./routes/userRoutes");
 * app.use("/api/users", userRoutes);
 *
 * Example calls (need a token because of requireAuth):
 *   TOKEN=<paste JWT>
 *   curl -H "Authorization: Bearer $TOKEN" http://localhost:4000/api/users/me
 *   curl -H "Authorization: Bearer $TOKEN" http://localhost:4000/api/users/66f...abc
 */

