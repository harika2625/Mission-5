const request = require("supertest");
const mongoose = require("mongoose");
const { app, server } = require("./searchAuctionItems.js");
const Product = require("./model/product");

describe("GET /auction-data/search", () => {
  it("should return matching auction items when searched by title", async () => {
    const response = await request(app).get(`/auction-data/search?query=mazda`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(
      response.body.some((product) =>
        product.title.toLowerCase().includes("mazda")
      )
    ).toBe(true);
  });

  it("should return 404 if no items match the search query", async () => {
    const response = await request(app).get(
      `/auction-data/search?query=nonexistentcar`
    );
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty(
      "message",
      "No matching auction items found"
    );
  });

  it("should return 400 if search query is missing", async () => {
    const response = await request(app).get(`/auction-data/search`);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error", "Search query is required");
  });
});
