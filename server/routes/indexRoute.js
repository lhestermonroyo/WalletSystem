const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const crypt = require("bcryptjs");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index.pug", { title: "Log In | Express Wallet" });
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/",
    failureFlash: true
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "You are now logged out.");
  res.redirect("/");
});

module.exports = router;
