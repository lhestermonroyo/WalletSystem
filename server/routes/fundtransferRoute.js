const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("fundtransfer.pug", { title: "Fund Transfer | Express Wallet" });
});

module.exports = router;
