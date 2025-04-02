# AuctionData-CLI

AuctionData-CLI is a Node.js-based Command Line Interface (CLI) application for managing auction data. It provides APIs and CLI commands to add, delete, and search auction items stored in a MongoDB database.

## Features

- Add auction items via CLI.
- Delete auction items by ID using CLI and also similar products with same title.
- Search auction items by using query parameter title in browser.
- Search by "all" term shows all data in database.
- Inserts one data at a time and also multiple data at once.
- Built-in unit tests for API endpoints,addProduc,deleteProduct.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or accessible via a connection string)

## Installation

1. Clone the repository:

   ```bash
   git clone <https://github.com/harika2625/Mission-5>
   cd AuctionData-CLI

   ```

2. Install the dependencies

   ```bash
    npm install

   ```

## Usage

- Add Auction data:For Single entry

  ```bash
  node cli.js add --title "<Item Title>" --description "<Item Description>" --price <Price> --category "<Category>"

  ```

  - For multiple entries

  ```bash
  node seedMany.js

  ```

- Delete auction item by ID:For single Item

  ```bash
  node cli.js delete --id <Item ID>
  ```

  - For multiple Deletion

  ```bash
    node deleteMany.js
  ```

- Search auction items by title:In browser

  ```bash
  node cli.js search --title "<Item Title>"

  ```

- Search all items in the database:

  ```bash
  node cli.js searchAll

  ```

## Running Unit Tests

- To run the unit tests for the APIs, use:

  ```bash
  npm test


  ```

## License

-This project is licensed under the MIT License - see the LICENSE file for details.
