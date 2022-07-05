const request = require("supertest");
const app = require("../src/app");
const { connection } = require("../src/db-connection");

const user = {
  username: "John Doe",
  email: "test@gmail.com",
  password: "Test@123",
};

let accessToken = "";

describe("Auth Routes", () => {
  beforeAll(async () => {
    await connection.query("DELETE FROM user_role");
    await connection.query("ALTER TABLE user_role AUTO_INCREMENT=1");

    await connection.query("DELETE FROM user");
    await connection.query("ALTER TABLE user AUTO_INCREMENT=1");

    await request(app).post("/api/users/register").send(user);
  });

  it("POST's /api/users/login, should return username, roles, accessToken and in cookie a refreshToken", async () => {
    const res = await request(app)
      .post("/api/users/login")
      .send({ email: user.email, password: user.password });
    expect(res.statusCode).toBe(200);
    expect(res.body.username).toEqual(user.username);
    expect(res.body.roles[0]).toEqual(2001);
    expect(res.body.accessToken).toBeDefined();

    accessToken = res.body.accessToken;

    const regex = /\brefreshToken\b/;
    expect(
      res.headers["set-cookie"].find((element) => regex.test(element))
    ).toBeDefined();
  });

  it("POST's /api/users/login, should return 400 status if email or password are not provided", async () => {
    const res = await request(app).post("/api/users/login");
    expect(res.statusCode).toBe(400);
  });

  it("POST's /api/users/login, should return 401 status if the user is unknow", async () => {
    const res = await request(app)
      .post("/api/users/login")
      .send({ email: "test-ohter@gmail.com", password: user.password });
    expect(res.statusCode).toBe(401);
  });

  it("GET's /api/users/logout, should return 204 status if user have an accessToken", async () => {
    const res = await request(app)
      .get("/api/users/logout")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.statusCode).toBe(204);
  });

  it("GET's /api/users/logout, should return 403 status if user don't have an accessToken", async () => {
    const res = await request(app).get("/api/users/logout");
    expect(res.statusCode).toBe(403);
  });
});
