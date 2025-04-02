const mongoose = require("mongoose");
const Product = require("./model/product.js");

const express = require("express");
const app = express();
app.use(express.json());
// Map global promise - get rid of warning
mongoose.Promise = global.Promise;
// connect to db
const db = mongoose.connect("mongodb://localhost:27017/auction-data", {});

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

// Delete Product
// const deleteProduct = async (id) => {
//   try {
//     const result = await Product.findByIdAndDelete(id);
//     if (result) {
//       console.log(`Product with ID '${id}' deleted successfully!`);
//     } else {
//       console.log(`Product with ID '${id}' not found.`);
//     }
//     mongoose.connection.close();
//   } catch (err) {
//     console.error("Error deleting product:", err);
//     mongoose.connection.close();
//   }
// };

// export methods
module.exports = { app, server, addProduct };
