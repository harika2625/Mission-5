const mongoose = require("mongoose");
const Product = require("./model/product.js");

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/auction-data", {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Sample Products
const products = [
  {
    title: "Samsung Galaxy",
    description:
      "The Samsung Galaxy S22 Ultra features a 6.8-inch AMOLED display, 108MP quad-camera system, and an S Pen. 256GB storage and 12GB RAM.",
    start_price: 800,
    reserve_price: 1200,
  },
  {
    title: "MacBook",
    description:
      "Apple MacBook Pro with M2 chip, 16-inch Retina display, 16GB RAM, and 512GB SSD. Features an advanced cooling system and all-day battery life.",
    start_price: 1800,
    reserve_price: 2500,
  },
  {
    title: "Sony PlayStation",
    description:
      "PlayStation 5 console with ultra-high-speed SSD, ray tracing, and haptic feedback. Includes one DualSense controller.",
    start_price: 400,
    reserve_price: 700,
  },
  {
    title: "Tesla",
    description:
      "Tesla Model 3 Long Range AWD, 2022 model, autopilot, 310-mile range per charge, and a premium interior.",
    start_price: 30000,
    reserve_price: 35000,
  },
  {
    title: "Canon Camera",
    description:
      "Canon EOS R6 full-frame mirrorless camera with 20MP sensor, 4K video recording, and dual-pixel autofocus.",
    start_price: 1500,
    reserve_price: 2000,
  },
];

// Function to Seed Data
const seedProducts = async () => {
  try {
    await Product.insertMany(products); // Inserts new products
    console.log("Sample data seeded successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("Error seeding data:", err);
    mongoose.connection.close();
  }
};

// Run the function
seedProducts();
