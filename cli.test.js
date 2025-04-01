const request = require("supertest");
const { app } = require("./index.js"); // Adjust the path to your app file

describe("POST/auction-data", () => {
  it("CLI should seed auction data into Mongo DB", async () => {
    const response = await request(app).post("/auction-data").send({
      title: "mazda",
      description:
        "2015 Mazda 3, in excellent condition with 65,000 miles. Features include a sunroof, leather seats, backup camera, and Bluetooth connectivity. Regularly serviced and maintained with no accidents. A great option for a reliable, fuel-efficient car",
      start_price: 100,
      reserve_price: 200,
    });
    expect(response.status).toBe(200);
  });
});
