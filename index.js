const mongoose = require("mongoose");

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;
// connect to db
const database = mongoose.connect("mongodb://localhost:27017/auction-data", {
  useMongoClient: true,
});
