const mongoose = require("mongoose");

// Product Schema
const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  start_price: { type: Number, required: true },
  reserve_price: { type: Number, required: true },
});

// export schema
module.exports = mongoose.model("Product", productSchema);
