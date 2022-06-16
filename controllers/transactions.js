const Transaction = require("../models/transaction");

const createTransaction = async (req, res) => {
  try {
    const createdTransaction = await new Transaction(req.body);
    await createdTransaction.save();
    res.status(201).json({ createdTransaction });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    return res.status(200).json({ transactions });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return res.status(404).send("No transaction with that id is found");
    }
    return res.status(500).json({ transaction });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = { getAllTransactions, createTransaction, getTransactionById };
