const request = require("supertest");
const app = require("../src/app");
const { connection } = require("../src/db-connection");

const { userOne, productOne } = require("./testData");

let accessToken = "";

describe("Products Routes", () => {
  beforeAll(async () => {
    await connection.query("DELETE FROM user_role");
    await connection.query("ALTER TABLE user_role AUTO_INCREMENT=1");

    await connection.query("DELETE FROM user");
    await connection.query("ALTER TABLE user AUTO_INCREMENT=1");

    await connection.query("DELETE FROM product");
    await connection.query("ALTER TABLE product AUTO_INCREMENT=1");

    await request(app).post("/api/users/register").send(userOne);
    const { body } = await request(app)
      .post("/api/users/login")
      .send({ email: userOne.email, password: userOne.password });
    accessToken = body.accessToken;
  });

  it("POST's /api/products, should return a new product", async () => {
    const res = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${accessToken}`)
      .send(productOne);
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toEqual(productOne.title);
    expect(res.body.price).toEqual(productOne.price);
    expect(res.body.image).toEqual(productOne.image);
    expect(res.body.rating).toEqual(productOne.rating);
  });

  it("GET's /api/products, should return an array with one product", async () => {
    const res = await request(app).get("/api/products");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });

  it("GET's /api/products/1, should return product with id 1", async () => {
    const res = await request(app)
      .get("/api/products/1")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toEqual(1);
  });

  it("GET's /api/products/2, should return status 404", async () => {
    const res = await request(app)
      .get("/api/products/2")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.statusCode).toBe(404);
  });

  it("PUT's /api/products/1, should return 204 status", async () => {
    const res = await request(app)
      .put("/api/products/1")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ price: 299.99 });
    expect(res.statusCode).toBe(204);
  });

  it("PUT's /api/products/1, should return 400 status", async () => {
    const res = await request(app)
      .put("/api/products/1")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ picture: "test" });
    expect(res.statusCode).toBe(400);
  });

  it("PUT's /api/products/4, should return 404 status", async () => {
    const res = await request(app)
      .put("/api/products/4")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ password: "Test@5678" });
    expect(res.statusCode).toBe(404);
  });

  it("PUT's /api/products/3, should return 403 status if we not provide an accessToken", async () => {
    const res = await request(app).put("/api/products/3");
    expect(res.statusCode).toBe(403);
  });

  it("DELETE's /api/products/1, should return 204 status", async () => {
    const res = await request(app)
      .delete("/api/products/1")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.statusCode).toBe(204);
  });

  it("DELETE's /api/products/3, should return 404 status", async () => {
    const res = await request(app)
      .delete("/api/products/3")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.statusCode).toBe(404);
  });

  it("DELETE's /api/products/3, should return 403 status if we not provide an accessToken", async () => {
    const res = await request(app).delete("/api/products/3");
    expect(res.statusCode).toBe(403);
  });
});
