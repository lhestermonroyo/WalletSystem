const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("billspayment.pug", { title: "Bills Payment | Express Wallet" });
});

module.exports = router;
