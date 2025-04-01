const mongoose = require("mongoose");
const Product = require("./model/product.js");

const express = require("express");
const app = express();
app.use(express.json());
// Map global promise - get rid of warning
mongoose.Promise = global.Promise;
// connect to db
mongoose.connect("mongodb://localhost:27017/auction-data", {});

// PORT
const PORT = 3000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Delete Product
const deleteProduct = async (id) => {
  try {
    const result = await Product.findByIdAndDelete(id);
    if (result) {
      console.log(`Product with ID '${id}' deleted successfully!`);
    } else {
      console.log(`Product with ID '${id}' not found.`);
    }
    mongoose.connection.close();
  } catch (err) {
    console.error("Error deleting product:", err);
    mongoose.connection.close();
  }
};

deleteProduct("67ec6f912cde62ce65ab53d5");
module.exports = { app, server, deleteProduct };
