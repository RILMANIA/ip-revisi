const request = require("supertest");
const app = require("../app");
const { sequelize, User, Favorite, Build } = require("../models");

let userA, userB;
let tokenA, tokenB;

beforeAll(async () => {
  await sequelize.sync({ force: true });

  userA = await User.create({
    name: "UserA",
    email: "usera@mail.com",
    password: "passwordA",
  });
  userB = await User.create({
    name: "UserB",
    email: "userb@mail.com",
    password: "passwordB",
  });

  const loginA = await request(app)
    .post("/login")
    .send({ name: "UserA", email: "usera@mail.com", password: "passwordA" });
  tokenA = loginA.body.access_token;

  const loginB = await request(app)
    .post("/login")
    .send({ name: "UserB", email: "userb@mail.com", password: "passwordB" });
  tokenB = loginB.body.access_token;
});

afterAll(async () => {
  await sequelize.close();
});

describe("GET /users/me", () => {
  test("200 - returns current user profile", async () => {
    const res = await request(app)
      .get("/users/me")
      .set("Authorization", `Bearer ${tokenA}`);

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      id: userA.id,
      name: "UserA",
      email: "usera@mail.com",
    });
  });

  test("401 - missing token", async () => {
    const res = await request(app).get("/users/me");
    expect(res.status).toBe(401);
    expect(res.body).toEqual({ message: "Invalid token" });
  });

  test("401 - invalid token", async () => {
    const res = await request(app)
      .get("/users/me")
      .set("Authorization", "Bearer invalid");
    expect(res.status).toBe(401);
    expect(res.body).toEqual({ message: "Invalid token" });
  });
});

describe("Favorites flow", () => {
  let favA1, favA2;

  test("201 - add favorite (owner A)", async () => {
    const res = await request(app)
      .post("/favorites")
      .set("Authorization", `Bearer ${tokenA}`)
      .send({ character_name: "Amber" });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toMatchObject({
      UserId: userA.id,
      character_name: "Amber",
    });
    favA1 = res.body;
  });

  test("201 - add another favorite (owner A)", async () => {
    const res = await request(app)
      .post("/favorites")
      .set("Authorization", `Bearer ${tokenA}`)
      .send({ character_name: "Lumine" });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      UserId: userA.id,
      character_name: "Lumine",
    });
    favA2 = res.body;
  });

  test("200 - list favorites for A", async () => {
    const res = await request(app)
      .get("/favorites")
      .set("Authorization", `Bearer ${tokenA}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(2);
  });

  test("403 - user B cannot delete user A's favorite", async () => {
    const res = await request(app)
      .delete(`/favorites/${favA1.id}`)
      .set("Authorization", `Bearer ${tokenB}`);
    expect(res.status).toBe(403);
    expect(res.body).toEqual({ message: "You are not authorized" });
  });

  test("404 - delete non-existent favorite", async () => {
    const res = await request(app)
      .delete(`/favorites/99999`)
      .set("Authorization", `Bearer ${tokenA}`);
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: "Data not found" });
  });

  test("200 - owner A deletes own favorite", async () => {
    const res = await request(app)
      .delete(`/favorites/${favA2.id}`)
      .set("Authorization", `Bearer ${tokenA}`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "Favorite deleted successfully" });
  });
});

describe("Builds flow", () => {
  let buildA1;

  test("201 - add build (owner A)", async () => {
    const res = await request(app)
      .post("/builds")
      .set("Authorization", `Bearer ${tokenA}`)
      .send({
        character_name: "Xiangling",
        weapon: "The Catch",
        artifact: "Emblem of Severed Fate",
        notes: "ER 220%",
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toMatchObject({
      UserId: userA.id,
      character_name: "Xiangling",
    });
    buildA1 = res.body;
  });

  test("200 - list builds for A", async () => {
    const res = await request(app)
      .get("/builds")
      .set("Authorization", `Bearer ${tokenA}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });

  test("200 - update build by owner A", async () => {
    const res = await request(app)
      .put(`/builds/${buildA1.id}`)
      .set("Authorization", `Bearer ${tokenA}`)
      .send({
        character_name: "Xiangling",
        weapon: "The Catch R5",
        artifact: "Emblem",
        notes: "ER 230%",
      });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "Build updated successfully" });
  });

  test("403 - user B cannot update A's build", async () => {
    const res = await request(app)
      .put(`/builds/${buildA1.id}`)
      .set("Authorization", `Bearer ${tokenB}`)
      .send({ character_name: "Xiangling" });
    expect(res.status).toBe(403);
    expect(res.body).toEqual({ message: "You are not authorized" });
  });

  test("404 - update non-existent build", async () => {
    const res = await request(app)
      .put(`/builds/99999`)
      .set("Authorization", `Bearer ${tokenA}`)
      .send({ character_name: "Xiangling" });
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: "Data not found" });
  });

  test("403 - user B cannot delete A's build", async () => {
    const res = await request(app)
      .delete(`/builds/${buildA1.id}`)
      .set("Authorization", `Bearer ${tokenB}`);
    expect(res.status).toBe(403);
    expect(res.body).toEqual({ message: "You are not authorized" });
  });

  test("200 - owner A deletes own build", async () => {
    const res = await request(app)
      .delete(`/builds/${buildA1.id}`)
      .set("Authorization", `Bearer ${tokenA}`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "Build deleted successfully" });
  });
});

describe("Auth guard on protected routes", () => {
  test("401 - POST /favorites without token", async () => {
    const res = await request(app)
      .post("/favorites")
      .send({ character_name: "NoAuth" });
    expect(res.status).toBe(401);
    expect(res.body).toEqual({ message: "Invalid token" });
  });

  test("401 - GET /favorites without token", async () => {
    const res = await request(app).get("/favorites");
    expect(res.status).toBe(401);
    expect(res.body).toEqual({ message: "Invalid token" });
  });

  test("401 - DELETE /favorites/:id without token", async () => {
    const res = await request(app).delete("/favorites/1");
    expect(res.status).toBe(401);
    expect(res.body).toEqual({ message: "Invalid token" });
  });

  test("401 - POST /builds without token", async () => {
    const res = await request(app)
      .post("/builds")
      .send({ character_name: "NoAuth" });
    expect(res.status).toBe(401);
    expect(res.body).toEqual({ message: "Invalid token" });
  });

  test("401 - GET /builds without token", async () => {
    const res = await request(app).get("/builds");
    expect(res.status).toBe(401);
    expect(res.body).toEqual({ message: "Invalid token" });
  });

  test("401 - PUT /builds/:id without token", async () => {
    const res = await request(app).put("/builds/1").send({ notes: "n/a" });
    expect(res.status).toBe(401);
    expect(res.body).toEqual({ message: "Invalid token" });
  });

  test("401 - DELETE /builds/:id without token", async () => {
    const res = await request(app).delete("/builds/1");
    expect(res.status).toBe(401);
    expect(res.body).toEqual({ message: "Invalid token" });
  });
});

describe("Auth edge: token for deleted user", () => {
  test("401 - token valid but user deleted", async () => {
    const ghost = await User.create({
      name: "Ghost",
      email: "ghost@mail.com",
      password: "ghostpass",
    });
    const login = await request(app)
      .post("/login")
      .send({ name: "Ghost", email: "ghost@mail.com", password: "ghostpass" });
    const ghostToken = login.body.access_token;

    await ghost.destroy();

    const res = await request(app)
      .get("/users/me")
      .set("Authorization", `Bearer ${ghostToken}`);
    expect(res.status).toBe(401);
    expect(res.body).toEqual({ message: "Invalid token" });
  });
});

describe("Controller error paths", () => {
  test("500 - GET /favorites handles model error", async () => {
    const spy = jest
      .spyOn(Favorite, "findAll")
      .mockRejectedValueOnce(new Error("boom"));
    const res = await request(app)
      .get("/favorites")
      .set("Authorization", `Bearer ${tokenA}`);
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ message: "Internal Server Error" });
    spy.mockRestore();
  });

  test("500 - POST /builds handles model error", async () => {
    const spy = jest
      .spyOn(Build, "create")
      .mockRejectedValueOnce(new Error("boom"));
    const res = await request(app)
      .post("/builds")
      .set("Authorization", `Bearer ${tokenA}`)
      .send({ character_name: "Test", weapon: "w", artifact: "a", notes: "n" });
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ message: "Internal Server Error" });
    spy.mockRestore();
  });
});
