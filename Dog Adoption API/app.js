// app.js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

// load environment variables
require("dotenv").config();

// route imports
const authRoutes = require("./routes/authRoutes");
const dogRoutes = require("./routes/dogRoutes");
const adoptionRoutes = require("./routes/adoptionRoutes");
const userRoutes = require("./routes/userRoutes");

// middleware imports
const { notFound } = require("./middlewares/notFound");
const { errorHandler } = require("./middlewares/error");

const app = express();

// global middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 300 }));

app.use((req, res, next) => {
  console.log("HIT:", req.method, req.originalUrl);
  next();
});

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

// base route
app.get("/", (req, res) => {
  res.json({ ok: true, name: "Dog Adoption API" });
});

// Debug route 
app.post("/debug", (req, res) => {
  res.json({ got: req.body });
});


// API routes
app.use("/api/auth", authRoutes);
app.use("/api/dogs", dogRoutes);
app.use("/api/adoptions", adoptionRoutes);
app.use("/api/users", userRoutes);

// error handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;
