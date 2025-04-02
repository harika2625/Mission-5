const mongoose = require("mongoose");

// Product Schema
const productSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  start_price: { type: Number },
  reserve_price: { type: Number },
});

// export schema
module.exports = mongoose.model("Product", productSchema);
