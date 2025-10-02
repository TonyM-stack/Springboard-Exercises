
// models/Adoption.js


const mongoose = require("mongoose");
/**
 * Adoption
 * One document = one successful adoption of a specific dog by a specific user.
 * We store references (ObjectIds) to the Dog and User documents.
 */

const adoptionSchema = new mongoose.Schema(
  {
     // Which dog was adopted
    dog: { type: mongoose.Schema.Types.ObjectId, // MongoDB reference id
        ref: "Dog",                              // model name to populate from
        required: true },                         // speeds up queries like { dog: someId }.  

    adopter: 
    { type: mongoose.Schema.Types.ObjectId, 
         ref: "User", 
         required: true, },                             // speeds up queries like { adopter: userId }

        // Optional message from adopter to dog owner
    message: { type: String, default: "" }
  },
  { timestamps: true }     // Automatically adds createdAt and updatedAt fields
);

/**
 * OPTIONAL (recommended): enforce business rules at the DB level.
 * Uncomment ONE (or both) of these indexes if you want hard guarantees:
 */

// A dog can be adopted only once (globally)
adoptionSchema.index({ dog: 1 }, { unique: true });

// A given user cannot adopt the same dog twice (belt & suspenders)
// adoptionSchema.index({ dog: 1, adopter: 1 }, { unique: true });

module.exports = mongoose.model("Adoption", adoptionSchema);
