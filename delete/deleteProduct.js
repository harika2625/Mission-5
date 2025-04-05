const mongoose = require("mongoose");
const Product = require("../model/product.js");

const express = require("express");
const app = express();
app.use(express.json());
// Map global promise - get rid of warning
mongoose.Promise = global.Promise;
// connect to db
const db = mongoose.connect("mongodb://localhost:27017/auction-data", {});

// PORT
const PORT = 3000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

app.delete("/auction-data/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      console.log("Invalid Product ID:", id);
      return res.status(400).json({ error: "Invalid product ID" });
    }
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Server error" });
  }
});
// Delete Product
const deleteProduct = async (id) => {
  try {
    if (!isValidObjectId(id)) {
      console.log(`Product with ID '${id}' has an invalid ID format.`);

      return;
    }

    const result = await Product.findByIdAndDelete(id);
    if (result) {
      console.log(`Product with ID '${id}' deleted successfully!`);
    } else {
      console.log(`Product with ID '${id}' not found.`);
    }
  } catch (err) {
    console.error("Error deleting product:", err);
  }
};

module.exports = { app, server, deleteProduct };
