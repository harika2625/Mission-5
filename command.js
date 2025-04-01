const { program } = require("commander");
const {
  addProduct,
  // deleteProduct,
} = require("./index.js"); // Adjust the path to your index.js file

program.version("1.0.0").description("CLI for managing auction data");

program
  .command("add <title> <description> <start_price> <reserve_price>")
  .alias("a")
  .description("Add a new product")
  .action((title, description, start_price, reserve_price) => {
    addProduct({
      title,
      description,
      start_price: parseFloat(start_price),
      reserve_price: parseFloat(reserve_price),
    });
  });
// .option("-d, --delete <id>", "Delete a product by ID")
program.parse(process.argv);
