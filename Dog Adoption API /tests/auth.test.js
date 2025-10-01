// tests/auth.test.js (CommonJS)
const request = require("supertest");
const { expect } = require("chai");
const mongoose = require("mongoose");
const app = require("../app");
const { connectDB } = require("../db"); 

describe("Auth flows", function () {
  this.timeout(15000);

  before(async () => {
    // ensure we connect to the test DB specified via env (set in npm script)
    await connectDB(process.env.MONGODB_URI);
    await mongoose.connection.db.dropDatabase();
  });

  after(async () => {
    await mongoose.connection.close();
  });

  it("registers a user and returns a JWT", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ username: "tony", password: "secret12" });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("token");
    expect(res.body).to.have.property("user");
    expect(res.body.user).to.include({ username: "tony" });
  });

  it("logs in a user and returns a JWT", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ username: "tony", password: "secret12" });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("token");
    expect(res.body.user).to.include({ username: "tony" });
  });

  it("rejects login with bad password", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ username: "tony", password: "wrongpass" });

    expect(res.status).to.equal(401);
    expect(res.body).to.have.property("error");
  });
});
