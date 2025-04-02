const mongoose = require("mongoose");
const Product = require("./model/product.js");

const express = require("express");
const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/auction-data", {})
  .then(async () => {
    const products = await Product.find({}, "title");
    console.log("Stored Products in Database:", products);
    mongoose.connection.close();
  })
  .catch((err) => console.error("Error fetching data:", err));

// API to fetch all auction items
app.get("/auction-data/all", async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.status(200).json(allProducts);
  } catch (error) {
    console.error("Error fetching all auction items:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// API to search similar auction items
app.get("/auction-data/search", async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ error: "Search query is required" });
    }

    console.log("🔍 Received Search Query:", query);

    const searchResults = await Product.find({
      title: { $regex: new RegExp(query, "i") },
    });

    console.log("Found Products:", searchResults);

    if (!searchResults.length) {
      return res
        .status(404)
        .json({ message: "No matching auction items found" });
    }

    res.status(200).json(searchResults);
  } catch (error) {
    console.error("❌ Error fetching auction items:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Start server
const PORT = 3000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app, server };
