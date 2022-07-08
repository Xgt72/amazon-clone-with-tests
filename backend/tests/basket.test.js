const request = require("supertest");
const app = require("../src/app");
const { connection } = require("../src/db-connection");

const {
  userOne,
  command,
  productOne,
  productTwo,
  basketOne,
  basketTwo,
} = require("./testData");

let accessToken = "";

describe("Commands Routes", () => {
  beforeAll(async () => {
    await connection.query("DELETE FROM user_role");
    await connection.query("ALTER TABLE user_role AUTO_INCREMENT=1");

    await connection.query("DELETE FROM user");
    await connection.query("ALTER TABLE user AUTO_INCREMENT=1");

    await connection.query("DELETE FROM product");
    await connection.query("ALTER TABLE product AUTO_INCREMENT=1");

    await connection.query("DELETE FROM command");
    await connection.query("ALTER TABLE command AUTO_INCREMENT=1");

    await connection.query("DELETE FROM basket");
    await connection.query("ALTER TABLE basket AUTO_INCREMENT=1");

    let res = await request(app).post("/api/users/register").send(userOne);
    userOne.id = res.body.id;
    command.userId = userOne.id;

    res = await request(app)
      .post("/api/users/login")
      .send({ email: userOne.email, password: userOne.password });
    accessToken = res.body.accessToken;

    res = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${accessToken}`)
      .send(productOne);
    productOne.id = res.body.id;

    res = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${accessToken}`)
      .send(productTwo);
    productTwo.id = res.body.id;

    res = await request(app)
      .post("/api/commands")
      .set("Authorization", `Bearer ${accessToken}`)
      .send(command);
    command.id = res.body.id;
  });

  it("GET's /api/users/1/commands/baskets, should return an empty array", async () => {
    const res = await request(app).get("/api/users/1/commands/baskets");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(0);
  });

  it("POST's /api/commands/1/baskets, should create baskets for command id 1", async () => {
    const res = await request(app)
      .post("/api/commands/1/baskets")
      .send({ baskets: [basketOne, basketTwo] });
    expect(res.statusCode).toBe(201);
    expect(res.body.length).toBe(2);
  });

  it("GET's /api/users/1/commands/baskets, should return all commands and baskets for user id 1", async () => {
    const res = await request(app).get("/api/users/1/commands/baskets");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].id).toEqual(command.id);
    expect(res.body[0].paymentIntentId).toEqual(command.paymentIntentId);
    expect(res.body[0].amount).toEqual(command.amount);
    expect(res.body[0].baskets.length).toEqual(2);
    expect(res.body[0].baskets[0].id).toEqual(productOne.id);
    expect(res.body[0].baskets[0].quantity).toEqual(basketOne.quantity);
    expect(res.body[0].baskets[0].title).toEqual(productOne.title);
    expect(res.body[0].baskets[0].price).toEqual(productOne.price);
    expect(res.body[0].baskets[0].image).toEqual(productOne.image);
    expect(res.body[0].baskets[0].rating).toEqual(productOne.rating);
  });

  it("GET's /api/users/1/commands/baskets, should return all commands and baskets for user id 1", async () => {
    const res = await request(app).get("/api/users/1/commands/baskets");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });

  it("POST's /api/users/1/commands/1/baskets, should create baskets for command id 1 and for user id 1", async () => {
    const res = await request(app)
      .post("/api/users/1/commands/1/baskets")
      .send({ baskets: [basketOne, basketTwo] });
    expect(res.statusCode).toBe(201);
    expect(res.body.length).toBe(4);
  });
});
