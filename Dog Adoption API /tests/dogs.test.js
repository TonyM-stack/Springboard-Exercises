// tests/dogs.test.js (CommonJS)
const request = require("supertest");
const { expect } = require("chai");
const mongoose = require("mongoose");
const app = require("../app");
const { connectDB } = require("../db"); // or "../config/db" if that's your path

async function registerAndLogin(username = "user", password = "secret12") {
  await request(app).post("/api/auth/register").send({ username, password });
  const res = await request(app).post("/api/auth/login").send({ username, password });
  return res.body.token;
}

describe("Dog endpoints", function () {
  this.timeout(20000);

  let ownerToken, adopterToken, createdDog;

  before(async () => {
    await connectDB(process.env.MONGODB_URI);
    await mongoose.connection.db.dropDatabase();

    ownerToken = await registerAndLogin("owner", "secret12");
    adopterToken = await registerAndLogin("adopter", "secret12");
  });

  after(async () => {
    await mongoose.connection.close();
  });

  it("requires auth to create a dog", async () => {
    const res = await request(app)
      .post("/api/dogs")
      .send({ name: "Buddy", description: "friendly" });

    expect(res.status).to.equal(401);
  });

  it("creates a dog for the authenticated owner", async () => {
    const res = await request(app)
      .post("/api/dogs")
      .set("Authorization", `Bearer ${ownerToken}`)
      .send({ name: "Buddy", description: "friendly" });

    expect(res.status).to.equal(201);
    expect(res.body).to.include({ name: "Buddy", status: "available" });
    createdDog = res.body;
  });

  it("lists dogs with pagination", async () => {
    const res = await request(app)
      .get("/api/dogs?page=1&limit=10&status=available")
      .set("Authorization", `Bearer ${ownerToken}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.keys(["items", "total", "page", "pages"]);
    expect(res.body.items).to.be.an("array");
    expect(res.body.total).to.be.a("number");
  });

  it("prevents owner from adopting their own dog", async () => {
    const res = await request(app)
      .post(`/api/dogs/${createdDog._id}/adopt`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .send({ message: "I love Buddy" });

    expect(res.status).to.equal(400);
    expect(res.body.error).to.match(/Cannot adopt your own dog/i);
  });

  it("allows a different user to adopt the dog", async () => {
    const res = await request(app)
      .post(`/api/dogs/${createdDog._id}/adopt`)
      .set("Authorization", `Bearer ${adopterToken}`)
      .send({ message: "Thanks for rescuing Buddy!" });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("dog");
    expect(res.body.dog.status).to.equal("adopted");
    expect(res.body.dog.thankYouMessage).to.equal("Thanks for rescuing Buddy!");
  });

  it("blocks deleting an adopted dog", async () => {
    const res = await request(app)
      .delete(`/api/dogs/${createdDog._id}`)
      .set("Authorization", `Bearer ${ownerToken}`);

    expect(res.status).to.equal(400);
    expect(res.body.error).to.match(/already adopted/i);
  });

  it("lists adopted dogs for adopter", async () => {
    const res = await request(app)
      .get("/api/dogs/me/adopted")
      .set("Authorization", `Bearer ${adopterToken}`);

    expect(res.status).to.equal(200);
    expect(res.body.items).to.be.an("array");
    expect(res.body.items[0]).to.have.property("_id");
  });
});
