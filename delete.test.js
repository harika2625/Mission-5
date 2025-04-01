const request = require("supertest");

const { app, server } = require("./deleteProduct.js");

describe("get/auction-data", () => {
  afterAll(async () => {
    if (server && server.close) {
      await server.close(); // Close the server
    }
  });
  it("should delete a product successfully", async () => {
    // First, create a product
    const product = await request(app).post("/auction-data").send({
      title: "mazda",
      description: "mazda 300 in good condition",
      start_price: 500,
      reserve_price: 1000,
    });

    // Then, delete the product
    const response = await request(app).delete(
      `/auction-data/${product.body._id}`
    );
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Product deleted successfully"
    );
  });
  it("should return 404 if product to delete does not exist", async () => {
    const response = await request(app).delete("/auction-data/invalid-id");
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error", "Product not found");
  });
});
