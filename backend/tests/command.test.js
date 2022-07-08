const request = require("supertest");
const app = require("../src/app");
const { connection } = require("../src/db-connection");

const { userOne } = require("./testData");
let { command } = require("./testData");

let accessToken = "";

describe("Commands Routes", () => {
  beforeAll(async () => {
    await connection.query("DELETE FROM user_role");
    await connection.query("ALTER TABLE user_role AUTO_INCREMENT=1");

    await connection.query("DELETE FROM user");
    await connection.query("ALTER TABLE user AUTO_INCREMENT=1");

    await connection.query("DELETE FROM command");
    await connection.query("ALTER TABLE command AUTO_INCREMENT=1");

    let res = await request(app).post("/api/users/register").send(userOne);
    userOne.id = res.body.id;
    command.userId = userOne.id;

    res = await request(app)
      .post("/api/users/login")
      .send({ email: userOne.email, password: userOne.password });
    accessToken = res.body.accessToken;
  });

  it("POST's /api/commands, should return a new command", async () => {
    const res = await request(app)
      .post("/api/commands")
      .set("Authorization", `Bearer ${accessToken}`)
      .send(command);
    command = res.body;
    expect(res.statusCode).toBe(201);
    expect(res.body.userId).toEqual(command.userId);
    expect(res.body.paymentIntentId).toEqual(command.paymentIntentId);
    expect(res.body.amount).toEqual(command.amount);
  });

  it("GET's /api/commands, should return an array with one command", async () => {
    const res = await request(app).get("/api/commands");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });

  it("GET's /api/commands/1, should return command with id 1", async () => {
    const res = await request(app)
      .get("/api/commands/1")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toEqual(1);
  });

  it("GET's /api/commands/2, should return status 404", async () => {
    const res = await request(app)
      .get("/api/commands/2")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.statusCode).toBe(404);
  });

  it("GET's /api/users/1/commands, should return an array with one command", async () => {
    const res = await request(app).get("/api/users/1/commands");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toEqual(1);
    expect(res.body[0].userId).toEqual(1);
  });

  it("PUT's /api/commands/1, should return 204 status", async () => {
    const res = await request(app)
      .put("/api/commands/1")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ amount: 299.99 });
    expect(res.statusCode).toBe(204);
  });

  it("PUT's /api/commands/1, should return 400 status", async () => {
    const res = await request(app)
      .put("/api/commands/1")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ picture: "test" });
    expect(res.statusCode).toBe(400);
  });

  it("PUT's /api/commands/4, should return 404 status", async () => {
    const res = await request(app)
      .put("/api/commands/4")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ amount: 188.34 });
    expect(res.statusCode).toBe(404);
  });

  it("PUT's /api/commands/3, should return 403 status if we not provide an accessToken", async () => {
    const res = await request(app).put("/api/commands/3");
    expect(res.statusCode).toBe(403);
  });

  it("DELETE's /api/commands/1, should return 204 status", async () => {
    const res = await request(app)
      .delete("/api/commands/1")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.statusCode).toBe(204);
  });

  it("DELETE's /api/commands/3, should return 404 status", async () => {
    const res = await request(app)
      .delete("/api/commands/3")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.statusCode).toBe(404);
  });

  it("DELETE's /api/commands/3, should return 403 status if we not provide an accessToken", async () => {
    const res = await request(app).delete("/api/commands/3");
    expect(res.statusCode).toBe(403);
  });

  it("POST's /api/users/1/commands, should return a new command", async () => {
    const res = await request(app)
      .post("/api/users/1/commands")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        paymentIntentId: command.paymentIntentId,
        amount: command.ammount,
      });
    command = res.body;
    expect(res.statusCode).toBe(201);
    expect(res.body.userId).toEqual(1);
    expect(res.body.paymentIntentId).toEqual(command.paymentIntentId);
    expect(res.body.amount).toEqual(command.amount);
  });
});
