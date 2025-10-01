const mongoose = require("mongoose");

const dogSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    status: { type: String, enum: ["available", "adopted"], default: "available", index: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    adoptedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    thankYouMessage: { type: String, default: "" }
  },
  { timestamps: true }
);

dogSchema.index({ name: "text", description: "text" });

module.exports = mongoose.model("Dog", dogSchema);
