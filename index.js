const mongoose = require("mongoose");
const Product = require("./model/product.js");

const express = require("express");
const product = require("./model/product.js");
const app = express();
app.use(express.json());
// Map global promise - get rid of warning
mongoose.Promise = global.Promise;
// connect to db
mongoose.connect("mongodb://localhost:27017/auction-data", {});

app.post("/auction-data", async (req, res) => {
  const { title, start_price, description, reserve_price } = req.body;

  if (!title || !start_price || !reserve_price || !description) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(400).json({ error: "Failed to add product" });
  }
});

// PORT
const PORT = 3000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// Add Product
const addProduct = (product) => {
  const newProduct = new Product(product);
  newProduct
    .save()
    .then((product) => {
      console.log("Product added:", product);
      mongoose.connection.close();
    })
    .catch((err) => {
      console.error("Error adding product:", err);
      mongoose.connection.close(); // Ensure connection closes even if there's an error
    });
};
// Remove product by title
const removeProduct = async (title) => {
  try {
    const result = await Product.findOneAndDelete({ title });
    if (result) {
      console.log(`✅ Product "${title}" removed successfully.`);
    } else {
      console.log(`❌ No product found with title "${title}".`);
    }
  } catch (error) {
    console.error("❌ Error removing product:", error);
  }
};
// export methods
module.exports = { app, server, addProduct, removeProduct };
