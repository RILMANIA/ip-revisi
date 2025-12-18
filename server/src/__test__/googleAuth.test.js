const request = require("supertest");
const { sequelize, User } = require("../models");

// Mock google-auth-library before requiring app
const mockVerifyIdToken = jest.fn();
jest.mock("google-auth-library", () => {
  return {
    OAuth2Client: jest.fn().mockImplementation(() => ({
      verifyIdToken: mockVerifyIdToken,
    })),
  };
});

// Now require app after mock is set up
const app = require("../app");

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

beforeEach(() => {
  // Reset mock before each test
  mockVerifyIdToken.mockReset();
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
    mockVerifyIdToken.mockResolvedValue({
      getPayload: () => ({
        email: "existing@gmail.com",
        name: "Existing User",
      }),
    });

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
    mockVerifyIdToken.mockResolvedValue({
      getPayload: () => ({
        email: "newuser@gmail.com",
        name: "New User",
      }),
    });

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
    mockVerifyIdToken.mockRejectedValue(new Error("Invalid token"));

    const res = await request(app)
      .post("/google-login")
      .send({ googleToken: "invalid-google-token" });

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ message: "Internal server error" });
  });

  test("500 - Google OAuth service error", async () => {
    // Mock network error
    mockVerifyIdToken.mockRejectedValue(new Error("Network timeout"));

    const res = await request(app)
      .post("/google-login")
      .send({ googleToken: "some-token" });

    expect(res.status).toBe(500);
    expect(res.body.message).toBe("Internal server error");
  });

  test("500 - database error during user lookup", async () => {
    // Mock successful Google verification
    mockVerifyIdToken.mockResolvedValue({
      getPayload: () => ({
        email: "dbtest@gmail.com",
        name: "DB Test User",
      }),
    });

    // Mock User.findOne to throw error
    const spy = jest
      .spyOn(User, "findOne")
      .mockRejectedValue(new Error("Database error"));

    const res = await request(app)
      .post("/google-login")
      .send({ googleToken: "valid-token" });

    expect(res.status).toBe(500);
    expect(res.body.message).toBe("Internal server error");

    // Restore original method
    spy.mockRestore();
  });
});
