#!/usr/bin/env node
const { Command } = require("commander");
const inquirer = require("inquirer");




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
const removeQuestions = [
  {
    type: "input",
    name: "title",
    message: "Enter the product title to remove:",
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
  .command("remove")
  .alias("r")
  .description("Remove a product by title")
  .action(() => {
    const { removeProduct } = require("./index");
    inquirer.default.prompt(removeQuestions).then((answers) => {
      removeProduct(answers.title);
    });
  });

program.parse(process.argv);
