const request = require("supertest");
const app = require("../app");
const { sequelize, User } = require("../models");

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("POST /register", () => {
  test("201 - success register returns name, email, message", async () => {
    const res = await request(app)
      .post("/register")
      .send({ name: "Test", email: "test@mail.com", password: "secret" });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      name: "Test",
      email: "test@mail.com",
      message: expect.any(String),
    });
  });

  test("400 - validation error when email missing", async () => {
    const res = await request(app)
      .post("/register")
      .send({ name: "NoEmail", password: "secret" });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message");
  });

  test("400 - unique email constraint", async () => {
    await User.create({
      name: "Dup",
      email: "dup@mail.com",
      password: "secret",
    });
    const res = await request(app)
      .post("/register")
      .send({ name: "Dup2", email: "dup@mail.com", password: "secret" });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message");
  });
});

describe("POST /login", () => {
  beforeAll(async () => {
    // ensure a user exists
    await User.create({
      name: "LoginUser",
      email: "login@mail.com",
      password: "secret",
    });
  });

  test("200 - success login returns access_token", async () => {
    const res = await request(app)
      .post("/login")
      .send({ email: "login@mail.com", password: "secret" });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("access_token", expect.any(String));
  });

  test("400 - missing email", async () => {
    const res = await request(app).post("/login").send({ password: "secret" });
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ message: "Email is required" });
  });

  test("400 - missing password", async () => {
    const res = await request(app)
      .post("/login")
      .send({ email: "login@mail.com" });
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ message: "Password is required" });
  });

  test("401 - invalid email/password when email not found", async () => {
    const res = await request(app)
      .post("/login")
      .send({ email: "notfound@mail.com", password: "secret" });
    expect(res.status).toBe(401);
    expect(res.body).toEqual({ message: "Invalid email/password" });
  });

  test("401 - invalid email/password when wrong password", async () => {
    const res = await request(app)
      .post("/login")
      .send({ email: "login@mail.com", password: "wrong" });
    expect(res.status).toBe(401);
    expect(res.body).toEqual({ message: "Invalid email/password" });
  });

  test("500 - internal server error from model failure", async () => {
    const spy = jest
      .spyOn(User, "findOne")
      .mockRejectedValueOnce(new Error("db down"));
    const res = await request(app)
      .post("/login")
      .send({ email: "login@mail.com", password: "secret" });
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ message: "Internal server error" });
    spy.mockRestore();
  });
});
