#!/usr/bin/env node
const { Command } = require("commander");
const inquirer = require("inquirer");
const prompt = inquirer.default; // 👈 Fix here
const { addProduct } = require("./index");

const program = new Command();

const questions = [
  {
    type: "input",
    name: "title",
    message: "Product name:",
  },
  {
    type: "input",
    name: "description",
    message: "Product description:",
  },
  {
    type: "input",
    name: "start_price",
    message: "Start price:",
  },
  {
    type: "input",
    name: "reserve_price",
    message: "Reserve price:",
  },
];

program
  .name("AuctionData-CLI")
  .description("CLI for managing auction data")
  .version("1.0.0");

program
  .command("add")
  .alias("a")
  .description("Add a new product")
  .action(() => {
    inquirer.default.prompt(questions).then((answers) => {
      addProduct(answers);
    });
  });
program
  .command("remove <title>")
  .alias("r")
  .description("Remove a product by title")
  .action((title) => {
    const { removeProduct } = require("./index"); // make sure removeProduct is exported from index.js
    removeProduct(title);
  });

program.parse(process.argv);
