const request = require("supertest");

const { app, server } = require("./index.js");
// Adjust the path to your app file

describe("POST/auction-data", () => {
  afterAll(async () => {
    if (server && server.close) {
      await server.close(); // Close server properly
    }
  });
  it("CLI should seed auction data into Mongo DB", async () => {
    const response = await request(app).post("/auction-data").send({
      title: "mazda",
      description:
        "2015 Mazda , in excellent condition with 65,000 miles. Features include a sunroof, leather seats, backup camera, and Bluetooth connectivity. Regularly serviced and maintained with no accidents. A great option for a reliable, fuel-efficient car",
      start_price: 1000,
      reserve_price: 2000,
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("_id");
  });

  it("should return error if required fields are missing", async () => {
    const response = await request(app).post("/auction-data").send({
      description: "Missing title and start_price fields",
      reserve_price: 300,
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error", "Missing required fields");
  });
  it("should return error if required fields are missing", async () => {
    const response = await request(app).post("/auction-data").send({
      description: "Missing description and reserve_price fields",
      start_price: 200,
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error", "Missing required fields");
  });
});
