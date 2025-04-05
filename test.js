const { addProduct } = require("./index.js");
const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/auction-data", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");

  // Test the addProduct function
  addProduct({
    title: "Test Product",
    description: "This is a test product",
    start_price: 100,
    reserve_price: 200,
  })
    .then(() => {
      console.log("Test product added successfully");
      mongoose.connection.close(); // Close the connection after the test
    })
    .catch((error) => {
      console.error("Error adding test product:", error);
      mongoose.connection.close(); // Close the connection even if there is an error
    });
});

mongoose.connection.on("error", (err) => {
  console.error("Error connecting to MongoDB:", err);
});
addProduct({
  title: "Test Product",
  description: "This is a test product",
  start_price: 100,
  reserve_price: 200,
});
