const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Stock = new Schema([
  {
    stock_name: String,
    stock_price: Number,
    stock_symbol: String,
    quantity: Number,
    totalCashValue: Number,
  },
  { timestamps: true },
]);

const Overview = new Schema({
  account_value: Number,
  buying_power: Number,
});

const StockModel = mongoose.model("stocks", Stock);
const OverviewModel = mongoose.model("overview", Overview);

module.exports = { StockModel, OverviewModel };
