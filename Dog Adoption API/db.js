// config/db.js
const mongoose = require("mongoose");

async function connectDB(uri = process.env.MONGODB_URI) {
  if (!uri) throw new Error("MONGODB_URI missing");
  try {
    await mongoose.connect(uri, { autoIndex: true });
    console.log("✅ Mongo connected");
  } catch (err) {
    console.error("❌ Mongo connection error:", err.message);
    process.exit(1); // quit if DB fails
  }
}

module.exports = { connectDB };
 


