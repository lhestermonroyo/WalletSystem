const express = require("express");
const router = express.Router();
const Accounts = require("../../models/accounts");
const Transactions = require("../../models/transactions");
const config = require("../../config/database");
const crypt = require("bcryptjs");

router.get("/", (req, res) => {
  res.render("deposit.pug", { title: "Deposit | Express Wallet" });
});

router.post("/add/:id", (req, res) => {
  Accounts.findById({ _id: req.params.id }, (err, account) => {
    if (err) {
      console.log(err);
    }

    console.log(account.email);

    crypt.compare(req.body.password, account.password, (err, match) => {
      if (err) {
        console.log(err);
      }

      if (match) {
        let query = { _id: req.params.id };
        Accounts.findByIdAndUpdate(
          query,
          {
            balance: parseFloat(req.body.amount) + parseFloat(account.balance)
          },
          err => {
            if (err) {
              console.log(err);
            }
            console.log("Deposit successful!");
          }
        );

        let transaction = new Transactions({
          transaction_type: "Deposit",
          sender: req.params.id,
          recepient: req.params.id,
          amount: req.body.amount
        });
        transaction.save(err => {
          if (err) {
            console.log(err);
          }
          console.log("Transaction saved!");
        });

        req.flash(
          "success",
          `Deposit successful! You have P${parseInt(req.body.amount) +
            parseInt(account.balance)} in your account.`
        );
        res.redirect("/deposit");
      } else {
        req.flash(
          "danger",
          "Password entered was incorrect. Please try again."
        );
        res.redirect("/deposit");
      }
    });
  });
});

module.exports = router;
