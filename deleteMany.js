const mongoose = require("mongoose");
const Product = require("./model/product.js");

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/auction-data", {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Function to deleteMany
const deleteProducts = async () => {
  try {
    await Product.deleteMany({ title: /Samsung/i }); // Deletes all products with "Samsung" in the title (case-insensitive)
    console.log("Matching products deleted successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("Error deleting products:", err);
    mongoose.connection.close();
  }
};
deleteProducts();
