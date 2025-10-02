// models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

/**
 * User
 * - Stores a unique username and a *hashed* password (never the plain text).
 * - We expose a virtual "password" for convenience; when set, a pre-save hook
 *   turns it into `passwordHash`.
 */
const userSchema = new mongoose.Schema(
  {
    // Public identifier for login. `unique:true` creates a unique index.
    username: { type: String, required: true, unique: true, trim: true },

    /**
     * The *hashed* password (bcrypt). Required so every user has credentials.
     * NOTE: You never store / return the plain password.
     * You can optionally hide this by default using `select:false` (see notes below).
     */
    passwordHash: { type: String, required: true }
  },
  {
    // Adds createdAt / updatedAt automatically.
    timestamps: true
  }
);

/**
 * VIRTUAL FIELD: `password`
 * - Not persisted to Mongo.
 * - Lets you do:
 *     const u = new User({ username: "alice" });
 *     u.password = "secret123";   // set the virtual
 *     await u.save();             // pre-save hook will hash into passwordHash
 */
userSchema.virtual("password").set(function (plain) {
  this._password = plain;
});

/**
 * PRE-SAVE HOOK
 * - If `password` virtual was set, hash it and store in `passwordHash`.
 * - Runs on `doc.save()` (not on `updateOne`/`findOneAndUpdate` unless you trigger it).
 */
userSchema.pre("save", async function () {
  if (this._password) {
    const saltRounds = 10;
    this.passwordHash = await bcrypt.hash(this._password, saltRounds);
  }
});

/**
 * INSTANCE METHOD: verify a candidate password against the stored hash.
 * - Usage: const ok = await user.verifyPassword("secret123");
 */
userSchema.methods.verifyPassword = function (plain) {
  return bcrypt.compare(plain, this.passwordHash);
};

module.exports = mongoose.model("User", userSchema);

 