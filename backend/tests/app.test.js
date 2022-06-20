const request = require("supertest");
const app = require("../index");

describe("Server", () => {
  it("Server is listening", async () => {
    const res = await request(app).get("/api/");
    expect(res.text).toBe("Hello From Your API");
  });

  it("GET's all users", async () => {
    const res = await request(app).get("/api/users");
    expect(res.body.length).toBeGreaterThan(0);
  });
});
