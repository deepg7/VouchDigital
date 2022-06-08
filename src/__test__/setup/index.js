import app from "../../app";
import request from "supertest";

import "jest";

describe("GET /", () => {
  it("returns user and token", async () => {
    const a = await await request(app).post("/user/signup").send({
      name: "Deep",
      phone: "1111111111",
      email: "deeep@gmail.com",
      password: "123123123",
    });
    console.log(a);
    expect(a).toBe(a);
  });
});
