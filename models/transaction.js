const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transaction = new Schema(
  {
    symbol: {
      type: String,
      required: true,
    },

    action: {
      type: String,
      required: true,
    },

    qty: {
      type: String,
      required: true,
    },

    price: {
      type: String,
      required: true,
    },

    total: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("transactions", transaction);
