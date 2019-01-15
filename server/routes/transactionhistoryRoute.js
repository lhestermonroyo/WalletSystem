const express = require("express");
const moment = require("moment");
const Accounts = require("../../models/accounts");
const Transactions = require("../../models/transactions");
const router = express.Router();

router.get("/", (req, res) => {
  Accounts.find({}, (err, accounts) => {
    if (err) {
      console.log(err);
    } else {
      Transactions.find({}, (err, transactions) => {
        if (err) {
          console.log(err);
        } else {
          transactions = transactions.map(transaction => {
            return {
              ...transaction,
              timestamp: moment(transaction.timestamp).format("dd/mm/yyyy")
            };
          });
          console.log("modified trans:", transactions);
          res.render("transactionhistory.pug", {
            title: "Transaction History | Express Wallet",
            accounts,
            transactions
          });
        }
      });
    }
  });
});

module.exports = router;
