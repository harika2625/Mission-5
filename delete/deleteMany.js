const mongoose = require("mongoose");
const Product = require("../model/product.js");

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/auction-data", {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Function to delete similar name products
// const deleteSameProducts = async () => {
//   try {
//     await Product.deleteMany({ title: /Samsung/i }); // Deletes all products with "Samsung" in the title (case-insensitive)
//     console.log("Matching products deleted successfully!");
//     mongoose.connection.close();
//   } catch (err) {
//     console.error("Error deleting products:", err);
//     mongoose.connection.close();
//   }
// };
const deleteAllProducts = async () => {
  try {
    await Product.deleteMany({}); // Deletes all entries in the collection
    console.log("All products deleted successfully!");
  } catch (err) {
    console.error("Error deleting products:", err);
  } finally {
    mongoose.connection.close();
  }
};
// deleteSameProducts();
deleteAllProducts();
