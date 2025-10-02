// models/Dog.js
const mongoose = require("mongoose");

/**
 * Dog
 * Represents a dog listed by an owner. A dog starts "available" and can be "adopted".
 * - `owner` is the user who created the listing.
 * - When adopted, we set `status="adopted"` and `adoptedBy=<User _id>`.
 */
const dogSchema = new mongoose.Schema(
  {
    // Display name for the dog (required). `trim` removes leading/trailing spaces.
    name: { type: String, required: true, trim: true },

    // Optional description. `trim` keeps the stored text clean.
    description: { type: String, trim: true },

    /**
     * Current adoption status.
     * - Only two allowed values (enum): "available" or "adopted".
     * - Indexed to speed up queries like: find all available dogs (very common).
     */
    status: {
      type: String,
      enum: ["available", "adopted"],
      default: "available",
      index: true
    },

    /**
     * The user who listed/owns the dog (required).
     * - `ref: "User"` lets us `.populate("owner")` to fetch owner details.
     * - Indexed to quickly get all dogs by an owner.
     */
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    /**
     * The user who adopted the dog (null until adopted).
     * - `ref: "User"` enables `.populate("adoptedBy")`.
     */
    adoptedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },

    /**
     * Optional note/thank-you message shown after adoption.
     */
    thankYouMessage: { type: String, default: "" }
  },
  {
    /**
     * Adds `createdAt` and `updatedAt` timestamps automatically.
     * Useful for sorting newest dogs, showing last updates, etc.
     */
    timestamps: true
  }
);

/**
 * Full-text search index:
 * - Enables text queries across `name` and `description`:
 *     Dog.find({ $text: { $search: "beagle friendly" } })
 *
 * ⚠️ MongoDB allows only ONE text index per collection.
 * If you later need to change which fields are included, you'll need to drop/recreate this index.
 *
 * Optional: you can assign weights if `name` should rank higher than `description`:
 *   dogSchema.index(
 *     { name: "text", description: "text" },
 *     { weights: { name: 5, description: 1 } }
 *   );
 */
dogSchema.index({ name: "text", description: "text" });  //Search for name and description at same time

/**
 * OPTIONAL: Convenience virtuals/methods
 * - `isAdopted` virtual: quick boolean check without repeating comparisons.
 */
// dogSchema.virtual("isAdopted").get(function () {
//   return this.status === "adopted" && !!this.adoptedBy;
// });

/**
 * OPTIONAL: Business rule indexes
 * - Prevent the same owner from listing two dogs with the exact same name (per-owner uniqueness).
 *   Commented out by default—turn on if your product wants this rule.
 */
// dogSchema.index({ owner: 1, name: 1 }, { unique: true });

/**
 * OPTIONAL: A pre-save guard to keep fields in sync:
 * - If `adoptedBy` is set, force `status="adopted"`.
 * - If `adoptedBy` becomes null, force `status="available"`.
 */
// dogSchema.pre("save", function () {
//   if (this.adoptedBy && this.status !== "adopted") this.status = "adopted";
//   if (!this.adoptedBy && this.status !== "available") this.status = "available";
// });

module.exports = mongoose.model("Dog", dogSchema);
