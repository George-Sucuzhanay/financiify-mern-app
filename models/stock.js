const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const Stock = new Schema(
    {
        stock_name: String,
        stock_price: Number,
        stock_symbol: String,
        quantity: Number,
        totalCashValue: Number
    },
    {timestamps: true}
)

module.exports = mongoose.model("stocks", Stock)