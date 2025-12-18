const request = require("supertest");
const app = require("../app");
const { sequelize, User } = require("../models");
const axios = require("axios");

jest.mock("axios");

let token;

beforeAll(async () => {
  await sequelize.sync({ force: true });

  const user = await User.create({
    name: "TestUser",
    email: "test@mail.com",
    password: "password",
  });

  const login = await request(app)
    .post("/login")
    .send({ name: "TestUser", email: "test@mail.com", password: "password" });
  token = login.body.access_token;
});

afterAll(async () => {
  await sequelize.close();
});

describe("POST /ai/explain", () => {
  test("200 - successfully get character explanation", async () => {
    const mockResponse = {
      data: {
        candidates: [
          {
            content: {
              parts: [
                {
                  text: "CHARACTER OVERVIEW\nTest character description\n\nBACKGROUND & LORE\nTest background",
                },
              ],
            },
          },
        ],
      },
    };

    axios.post.mockResolvedValue(mockResponse);

    const res = await request(app)
      .post("/ai/explain")
      .set("Authorization", `Bearer ${token}`)
      .send({ characterName: "Diluc" });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("characterName", "Diluc");
    expect(res.body).toHaveProperty("explanation");
    expect(res.body.explanation).toContain("CHARACTER OVERVIEW");
  });

  test("400 - missing character name", async () => {
    const res = await request(app)
      .post("/ai/explain")
      .set("Authorization", `Bearer ${token}`)
      .send({});

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ message: "Character name is required" });
  });

  test("503 - API key not configured", async () => {
    const originalKey = process.env.GEMINI_API_KEY;
    process.env.GEMINI_API_KEY = "your-gemini-api-key";

    const res = await request(app)
      .post("/ai/explain")
      .set("Authorization", `Bearer ${token}`)
      .send({ characterName: "Diluc" });

    expect(res.status).toBe(503);
    expect(res.body.message).toContain("Gemini API key not configured");

    process.env.GEMINI_API_KEY = originalKey;
  });

  test("500 - unexpected AI response structure", async () => {
    const mockResponse = {
      data: {
        candidates: [
          {
            content: {
              parts: [],
            },
          },
        ],
      },
    };

    axios.post.mockResolvedValue(mockResponse);

    const res = await request(app)
      .post("/ai/explain")
      .set("Authorization", `Bearer ${token}`)
      .send({ characterName: "Diluc" });

    expect(res.status).toBe(500);
    expect(res.body.message).toContain("Received unexpected response");
  });

  test("503 - invalid API key or model not available (400)", async () => {
    axios.post.mockRejectedValue({
      response: {
        status: 400,
        data: { error: "API key invalid" },
      },
    });

    const res = await request(app)
      .post("/ai/explain")
      .set("Authorization", `Bearer ${token}`)
      .send({ characterName: "Diluc" });

    expect(res.status).toBe(503);
    expect(res.body.message).toContain("Invalid Gemini API key");
  });

  test("503 - model not found (404)", async () => {
    axios.post.mockRejectedValue({
      response: {
        status: 404,
        data: { error: "Model not found" },
      },
    });

    const res = await request(app)
      .post("/ai/explain")
      .set("Authorization", `Bearer ${token}`)
      .send({ characterName: "Diluc" });

    expect(res.status).toBe(503);
    expect(res.body.message).toContain("Invalid Gemini API key");
  });

  test("500 - general API error", async () => {
    axios.post.mockRejectedValue({
      message: "Network error",
      response: {
        status: 500,
      },
    });

    const res = await request(app)
      .post("/ai/explain")
      .set("Authorization", `Bearer ${token}`)
      .send({ characterName: "Diluc" });

    expect(res.status).toBe(500);
    expect(res.body.message).toContain("Failed to get AI explanation");
  });

  test("401 - unauthorized request", async () => {
    const res = await request(app)
      .post("/ai/explain")
      .send({ characterName: "Diluc" });

    expect(res.status).toBe(401);
  });
});

describe("POST /ai/recommend", () => {
  test("200 - successfully get build recommendation", async () => {
    const mockResponse = {
      data: {
        candidates: [
          {
            content: {
              parts: [
                {
                  text: "Best weapon: Wolf's Gravestone\nBest artifacts: Crimson Witch",
                },
              ],
            },
          },
        ],
      },
    };

    axios.post.mockResolvedValue(mockResponse);

    const res = await request(app)
      .post("/ai/recommend")
      .set("Authorization", `Bearer ${token}`)
      .send({ characterName: "Diluc" });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("characterName", "Diluc");
    expect(res.body).toHaveProperty("recommendation");
    expect(res.body.recommendation).toContain("weapon");
  });

  test("400 - missing character name", async () => {
    const res = await request(app)
      .post("/ai/recommend")
      .set("Authorization", `Bearer ${token}`)
      .send({});

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ message: "Character name is required" });
  });

  test("503 - API key not configured", async () => {
    const originalKey = process.env.GEMINI_API_KEY;
    try {
      delete process.env.GEMINI_API_KEY;

      const res = await request(app)
        .post("/ai/recommend")
        .set("Authorization", `Bearer ${token}`)
        .send({ characterName: "Diluc" });

      expect(res.status).toBe(503);
      expect(res.body.message).toContain("Gemini API key not configured");
    } finally {
      process.env.GEMINI_API_KEY = originalKey;
    }
  });

  test("500 - unexpected AI response structure", async () => {
    const mockResponse = {
      data: {
        candidates: [
          {
            content: {
              parts: [],
            },
          },
        ],
      },
    };

    axios.post.mockResolvedValue(mockResponse);

    const res = await request(app)
      .post("/ai/recommend")
      .set("Authorization", `Bearer ${token}`)
      .send({ characterName: "Diluc" });

    expect(res.status).toBe(500);
    expect(res.body.message).toContain("Received unexpected response");
  });

  test("503 - Gemini API error (404)", async () => {
    axios.post.mockRejectedValue({
      response: {
        status: 404,
        data: { error: "Model not found" },
      },
    });

    const res = await request(app)
      .post("/ai/recommend")
      .set("Authorization", `Bearer ${token}`)
      .send({ characterName: "Diluc" });

    expect(res.status).toBe(503);
    expect(res.body.message).toContain("Gemini API error");
  });

  test("500 - general error without response", async () => {
    axios.post.mockRejectedValue(new Error("Network timeout"));

    const res = await request(app)
      .post("/ai/recommend")
      .set("Authorization", `Bearer ${token}`)
      .send({ characterName: "Diluc" });

    expect(res.status).toBe(500);
    expect(res.body.message).toContain("Failed to get AI recommendation");
  });

  test("401 - unauthorized request", async () => {
    const res = await request(app)
      .post("/ai/recommend")
      .send({ characterName: "Diluc" });

    expect(res.status).toBe(401);
  });
});
