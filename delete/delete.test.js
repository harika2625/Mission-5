const request = require("supertest");
const mongoose = require("mongoose");
const { app, server } = require("./deleteProduct.js");
const Product = require("../model/product.js");

describe("DELETE/auction-data/:id", () => {
  afterAll(async () => {
    if (server && server.close) {
      await server.close(); // Close the server
    }
    await mongoose.connection.close();
  });
  it("should delete an existing product successfully", async () => {
    // Fetch an existing product from the database
    const existingProduct = await Product.findOne();

    // Ensure a product exists in the database
    expect(existingProduct).not.toBeNull();
    const productId = existingProduct._id;

    // Then, delete the product
    const response = await request(app).delete(`/auction-data/${productId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Product deleted successfully"
    );

    // Verify the product is deleted
    const deletedProduct = await Product.findById(productId);
    expect(deletedProduct).toBeNull();
  });
  it("should return 400 if product ID format is invalid", async () => {
    const response = await request(app).delete("/auction-data/invalid-id");
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error", "Invalid product ID");
  });

  it("should return 404 if product does not exist", async () => {
    const validNonExistentId = new mongoose.Types.ObjectId(); // Generate a valid ObjectId
    const response = await request(app).delete(
      `/auction-data/${validNonExistentId}`
    );
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error", "Product not found");
  });
});
