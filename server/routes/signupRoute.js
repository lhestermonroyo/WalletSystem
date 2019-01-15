const express = require("express");
const mongoose = require("mongoose");
const crypt = require("bcryptjs");
const router = express.Router();

router.get("/", (req, res) => {
  Accounts.find({}, (err, accounts) => {
    if (err) {
      console.log(err);
    } else {
      res.render("signup.pug", {
        title: "Sign Up | Express Wallet",
        accounts: accounts
      });
    }
  });
});

let Accounts = require("../../models/accounts");
router.post("/add", (req, res) => {
  if (req.body.password === req.body.con_password) {
    Accounts.count({ email: req.body.email }, (err, cnt) => {
      if (err) {
        console.log(err);
      } else {
        if (cnt == 0) {
          let account = new Accounts({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            balance: parseFloat(0).toFixed(2)
          });

          crypt.genSalt(10, (err, salt) => {
            crypt.hash(account.password, salt, (err, hash) => {
              if (err) {
                console.log(err);
              }

              account.password = hash;
              account.save(err => {
                if (err) {
                  console.log(err);
                } else {
                  req.flash(
                    "success",
                    "You have created your Express Wallet account!"
                  );
                  res.redirect("/signup");
                }
              });
            });
          });
        } else {
          req.flash("danger", "E-mail already existed. Please try again.");
          res.redirect("/signup");
        }
      }
    });
  } else {
    req.flash("danger", "Passwords not identical. Please try again.");
    res.redirect("/signup");
  }
});

module.exports = router;
