const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("checkbalance.pug", { title: "Check Balance | Express Wallet" });
});

module.exports = router;
