const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("home.pug", { title: "Dashboard | Express Wallet" });
});

module.exports = router;
