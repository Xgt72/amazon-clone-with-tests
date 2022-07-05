const request = require("supertest");
const app = require("../src/app");
const { connection } = require("../src/db-connection");

const user = {
  username: "John Doe",
  email: "test@gmail.com",
  password: "Test@123",
};

const userTwo = {
  username: "Jane Doe",
  email: "test1@gmail.com",
  password: "Test@1234",
};

describe("Users Routes", () => {
  beforeAll(async () => {
    await connection.query("DELETE FROM user_role");
    await connection.query("ALTER TABLE user_role AUTO_INCREMENT=1");

    await connection.query("DELETE FROM user");
    await connection.query("ALTER TABLE user AUTO_INCREMENT=1");
  });

  it("GET's /api/users, should return an empty array", async () => {
    const res = await request(app).get("/api/users");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(0);
  });

  it("POST's /api/users/register, should return a new user", async () => {
    const res = await request(app).post("/api/users/register").send(user);
    expect(res.statusCode).toBe(201);
    expect(res.body.username).toEqual(user.username);
    expect(res.body.email).toEqual(user.email);
    expect(res.body.password).toBe(undefined);
    expect(res.body.roles.length).toBeGreaterThan(0);
  });

  it("GET's /api/users, should return an array with one user", async () => {
    const res = await request(app).get("/api/users");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });

  it("GET's /api/users/1, should return user with id 1", async () => {
    const res = await request(app).get("/api/users/1");
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toEqual(1);
  });

  it("GET's /api/users/2, should return status 404", async () => {
    const res = await request(app).get("/api/users/2");
    expect(res.statusCode).toBe(404);
  });

  it("GET's /api/users/1/roles, should return user with id 1 and his role", async () => {
    const res = await request(app).get("/api/users/1/roles");
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toEqual(1);
    expect(res.body.roles.length).toEqual(1);
  });

  it("POST's /api/users/register?role=2, should return a new user with EDITOR role", async () => {
    const res = await request(app)
      .post("/api/users/register?role=2")
      .send(userTwo);
    expect(res.statusCode).toBe(201);
    expect(res.body.username).toEqual(userTwo.username);
    expect(res.body.email).toEqual(userTwo.email);
    expect(res.body.password).toBe(undefined);
    expect(res.body.roles[0].title).toEqual("EDITOR");
  });

  it("PUT's /api/users/1, should return 204 status", async () => {
    const res = await request(app)
      .put("/api/users/1")
      .send({ password: "Test@5678" });
    expect(res.statusCode).toBe(204);
  });

  it("PUT's /api/users/3, should return 404 status", async () => {
    const res = await request(app)
      .put("/api/users/4")
      .send({ password: "Test@5678" });
    expect(res.statusCode).toBe(404);
  });

  it("DELETE's /api/users/2, should return 204 status", async () => {
    const res = await request(app).delete("/api/users/2");
    expect(res.statusCode).toBe(204);
  });

  it("DELETE's /api/users/3, should return 404 status", async () => {
    const res = await request(app).delete("/api/users/3");
    expect(res.statusCode).toBe(404);
  });

  it("GET's /api/users, should return an array with user 'John Doe'", async () => {
    const res = await request(app).get("/api/users");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].username).toEqual(user.username);
  });

  it("POST's /api/users/register, should return an error if password not matches the rules", async () => {
    const res = await request(app)
      .post("/api/users/register")
      .send({ ...userTwo, password: "test@123" });
    expect(res.statusCode).toBe(400);
    expect(res.text).toEqual("password is wrong");
  });

  it("POST's /api/users/register, should return an error if email is already used", async () => {
    const res = await request(app).post("/api/users/register").send(user);
    expect(res.statusCode).toBe(400);
    expect(res.text).toEqual("email is already used");
  });

  it("PUT's /api/users/1, should return 400 status, if we provide an email", async () => {
    const res = await request(app)
      .put("/api/users/1")
      .send({ password: "Test@5678", email: "newEmail@gmail.com" });
    expect(res.statusCode).toBe(400);
    expect(res.text).toEqual("You must provide valid data");
  });
});
