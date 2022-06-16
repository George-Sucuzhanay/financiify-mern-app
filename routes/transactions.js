const { Router } = require("express");
const transactionsControllers = require("../controllers/transactions");
const transactionRouter = Router();

transactionRouter.get(
  "/transactions",
  transactionsControllers.getAllTransactions
);
transactionRouter.post(
  "/transactions",
  transactionsControllers.createTransaction
);
transactionRouter.get(
  "/transactions/:id",
  transactionsControllers.createTransaction
);

module.exports = transactionRouter;
