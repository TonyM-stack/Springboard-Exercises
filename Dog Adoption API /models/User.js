const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    passwordHash: { type: String, required: true }
  },
  { timestamps: true }
);

// Optional convenience: set user.password = "plain" to trigger hashing
userSchema.virtual("password").set(function (plain) {
  this._password = plain;
});

userSchema.pre("save", async function () {
  if (this._password) {
    const saltRounds = 10;
    this.passwordHash = await bcrypt.hash(this._password, saltRounds);
  }
});

userSchema.methods.verifyPassword = function (plain) {
  return bcrypt.compare(plain, this.passwordHash);
};

module.exports = mongoose.model("User", userSchema);
 