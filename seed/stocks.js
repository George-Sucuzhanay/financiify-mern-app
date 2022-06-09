const db = require("../db");
const Stock = require("../models/stock");

db.on("error", console.error.bind(console, "MongoDB connection error:"));

const main = async () => {
  const stocks = [
    {
      stock_name: "Apple",
      stock_price: 213.34,
      stock_symbol: "AAPL",
      quantity: 2,
      totalCashValue: 426.68,
    },
    {
      stock_name: "Netflix",
      stock_price: 123.22,
      stock_symbol: "NFLX",
      quantity: 2,
      totalCashValue: 246.44,
    },
    {
      stock_name: "Alphabet",
      stock_price: 213.34,
      stock_symbol: "GOOGL",
      quantity: 2,
      totalCashValue: 426.68,
    },
    {
      stock_name: "Starbucks",
      stock_price: 76.26,
      stock_symbol: "SBUX",
      quantity: 2,
      totalCashValue: 152.52,
    },
    {
      stock_name: "Roblox",
      stock_price: 28.94,
      stock_symbol: "RBLX",
      quantity: 5,
      totalCashValue: 144.7,
    },
    {
      stock_name: "Palantir",
      stock_price: 8.46,
      stock_symbol: "PLTR",
      quantity: 6,
      totalCashValue: 50.76,
    },
  ];
  await Stock.deleteMany();
  await Stock.insertMany(stocks);
  console.log("Created Stocks!");
};
const run = async () => {
  await main();
  db.close();
};
run();
