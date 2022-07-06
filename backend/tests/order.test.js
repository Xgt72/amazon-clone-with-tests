const request = require("supertest");
const app = require("../src/app");
const { connection } = require("../src/db-connection");

const user = {
  username: "John Doe",
  email: "test@gmail.com",
  password: "Test@123",
};

const product = {
  title:
    "Nintendo Switch avec paire de Joy-Con Rouge N&eacute;on et Bleu N&eacute;on",
  price: 329.99,
  image:
    "https://images-na.ssl-images-amazon.com/images/I/71r5EDssKdL._AC_SX679_.jpg",
  rating: 5,
};

let accessToken = "";

describe("Orders Routes", () => {
  beforeAll(async () => {
    await connection.query("DELETE FROM user_role");
    await connection.query("ALTER TABLE user_role AUTO_INCREMENT=1");

    await connection.query("DELETE FROM user");
    await connection.query("ALTER TABLE user AUTO_INCREMENT=1");

    await connection.query("TRUNCATE TABLE order");

    await request(app).post("/api/users/register").send(user);
    const { body } = await request(app)
      .post("/api/users/login")
      .send({ email: user.email, password: user.password });
    accessToken = body.accessToken;
  });

  it("POST's /api/orders, should return a new product", async () => {
    const res = await request(app)
      .post("/api/orders")
      .set("Authorization", `Bearer ${accessToken}`)
      .send(product);
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toEqual(product.title);
    expect(res.body.price).toEqual(product.price);
    expect(res.body.image).toEqual(product.image);
    expect(res.body.rating).toEqual(product.rating);
  });

  it("GET's /api/orders, should return an array with one product", async () => {
    const res = await request(app).get("/api/orders");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });

  it("GET's /api/orders/1, should return product with id 1", async () => {
    const res = await request(app)
      .get("/api/orders/1")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toEqual(1);
  });

  it("GET's /api/orders/2, should return status 404", async () => {
    const res = await request(app)
      .get("/api/orders/2")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.statusCode).toBe(404);
  });

  it("PUT's /api/orders/1, should return 204 status", async () => {
    const res = await request(app)
      .put("/api/orders/1")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ price: 299.99 });
    expect(res.statusCode).toBe(204);
  });

  it("PUT's /api/orders/1, should return 400 status", async () => {
    const res = await request(app)
      .put("/api/orders/1")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ picture: "test" });
    expect(res.statusCode).toBe(400);
  });

  it("PUT's /api/orders/3, should return 404 status", async () => {
    const res = await request(app)
      .put("/api/orders/4")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ password: "Test@5678" });
    expect(res.statusCode).toBe(404);
  });

  it("PUT's /api/orders/3, should return 403 status if we not provide an accessToken", async () => {
    const res = await request(app).put("/api/orders/3");
    expect(res.statusCode).toBe(403);
  });

  it("DELETE's /api/orders/1, should return 204 status", async () => {
    const res = await request(app)
      .delete("/api/orders/1")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.statusCode).toBe(204);
  });

  it("DELETE's /api/orders/3, should return 404 status", async () => {
    const res = await request(app)
      .delete("/api/orders/3")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.statusCode).toBe(404);
  });

  it("DELETE's /api/orders/3, should return 403 status if we not provide an accessToken", async () => {
    const res = await request(app).delete("/api/orders/3");
    expect(res.statusCode).toBe(403);
  });
});
