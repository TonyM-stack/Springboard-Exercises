// scripts/seed.js
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { connectDB } = require("../db");         // or "../config/db" if that's your path
// const { isTest } = require("../config");        // adjust path if needed
const User = require("../models/User");
const Dog = require("../models/Dog");

async function run() {
  await connectDB();

  console.log("🔗 Host:", mongoose.connection.host);
  console.log("🔗 DB:", mongoose.connection.name)

  console.log("🧹 Clearing collections...");
  await Promise.all([User.deleteMany({}), Dog.deleteMany({})]);


  console.log("👤 Creating users (hashing here)...");
  const [alice, bob] = await User.create([
    {
      username: "alice",
      passwordHash: await bcrypt.hash("password123", 10),
    },
    {
      username: "bob",
      passwordHash: await bcrypt.hash("password123", 10),
    },
  ]);

  console.log("🐶 Creating dogs...");
  const dogs = await Dog.create([
    { name: "Buddy", description: "Friendly beagle", owner: alice._id },
    { name: "Luna",  description: "Energetic husky", owner: alice._id },
    { name: "Max",   description: "Calm lab",        owner: bob._id   },
  ]);

  console.log("✅ Seed complete:",
    { users: [alice.username, bob.username], dogs: dogs.map(d => d.name) });

  await mongoose.connection.close();
  console.log("🔌 Mongo connection closed");
};

run().catch(err => {
  console.error("❌ Seed error:", err);
  process.exit(1);
});
