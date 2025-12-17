const request = require("supertest");
const app = require("../app");
const { sequelize, User } = require("../models");
const { OAuth2Client } = require("google-auth-library");

jest.mock("google-auth-library");

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("POST /google-login", () => {
  test("200 - successful Google login with existing user", async () => {
    // Create existing user
    const existingUser = await User.create({
      name: "Existing User",
      email: "existing@gmail.com",
      password: "google_password",
    });

    // Mock Google OAuth verification
    const mockVerifyIdToken = jest.fn().mockResolvedValue({
      getPayload: () => ({
        email: "existing@gmail.com",
        name: "Existing User",
      }),
    });

    OAuth2Client.prototype.verifyIdToken = mockVerifyIdToken;

    const res = await request(app)
      .post("/google-login")
      .send({ googleToken: "valid-google-token" });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("access_token");
    expect(res.body.user).toMatchObject({
      id: existingUser.id,
      name: "Existing User",
      email: "existing@gmail.com",
    });
  });

  test("200 - successful Google login with new user", async () => {
    // Mock Google OAuth verification for new user
    const mockVerifyIdToken = jest.fn().mockResolvedValue({
      getPayload: () => ({
        email: "newuser@gmail.com",
        name: "New User",
      }),
    });

    OAuth2Client.prototype.verifyIdToken = mockVerifyIdToken;

    const res = await request(app)
      .post("/google-login")
      .send({ googleToken: "valid-google-token" });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("access_token");
    expect(res.body.user).toMatchObject({
      name: "New User",
      email: "newuser@gmail.com",
    });
    expect(res.body.user).toHaveProperty("id");

    // Verify user was created in database
    const createdUser = await User.findOne({
      where: { email: "newuser@gmail.com" },
    });
    expect(createdUser).toBeTruthy();
    expect(createdUser.name).toBe("New User");
  });

  test("400 - missing Google token", async () => {
    const res = await request(app).post("/google-login").send({});

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ message: "Google token is required" });
  });

  test("500 - invalid Google token", async () => {
    // Mock Google OAuth verification failure
    const mockVerifyIdToken = jest
      .fn()
      .mockRejectedValue(new Error("Invalid token"));

    OAuth2Client.prototype.verifyIdToken = mockVerifyIdToken;

    const res = await request(app)
      .post("/google-login")
      .send({ googleToken: "invalid-google-token" });

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ message: "Internal server error" });
  });

  test("500 - Google OAuth service error", async () => {
    // Mock network error
    const mockVerifyIdToken = jest
      .fn()
      .mockRejectedValue(new Error("Network timeout"));

    OAuth2Client.prototype.verifyIdToken = mockVerifyIdToken;

    const res = await request(app)
      .post("/google-login")
      .send({ googleToken: "some-token" });

    expect(res.status).toBe(500);
    expect(res.body.message).toBe("Internal server error");
  });

  test("500 - database error during user creation", async () => {
    // Mock successful Google verification
    const mockVerifyIdToken = jest.fn().mockResolvedValue({
      getPayload: () => ({
        email: "dbtest@gmail.com",
        name: "DB Test User",
      }),
    });

    OAuth2Client.prototype.verifyIdToken = mockVerifyIdToken;

    // Mock User.create to throw error
    const originalCreate = User.create;
    User.create = jest.fn().mockRejectedValue(new Error("Database error"));

    const res = await request(app)
      .post("/google-login")
      .send({ googleToken: "valid-token" });

    expect(res.status).toBe(500);
    expect(res.body.message).toBe("Internal server error");

    // Restore original method
    User.create = originalCreate;
  });
});
