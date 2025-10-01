const mongoose = require("mongoose");

const adoptionSchema = new mongoose.Schema(
  {
    dog: { type: mongoose.Schema.Types.ObjectId, ref: "Dog", required: true, index: true },
    adopter: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    message: { type: String, default: "" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Adoption", adoptionSchema);
