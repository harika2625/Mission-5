const mongoose = require("mongoose");

// Product Schema
const productSchema = mongoose.Schema({
  title: { type: string },
  description: { type: string },
  start_price: { type: number },
  reserve_price: { type: number },
});

// export schema
module.exports = mongoose.model("Product", productSchema);
