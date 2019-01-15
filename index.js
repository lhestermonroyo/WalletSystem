const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const expressValidator = require("express-validator");

const indexRoute = require("./server/routes/indexRoute");
const signupRoute = require("./server/routes/signupRoute");
const homeRoute = require("./server/routes/homeRoute");
const fundtransferRoute = require("./server/routes/fundtransferRoute");
const checkbalanceRoute = require("./server/routes/checkbalanceRoute");
const depositRoute = require("./server/routes/depositRoute");
const withdrawRoute = require("./server/routes/withdrawRoute");
const billspaymentRoute = require("./server/routes/billspaymentRoute");
const transactionhistoryRoute = require("./server/routes/transactionhistoryRoute");

const config = require("./config/database");
const app = express();
const port = 3000;
require("./config/passport")(passport);

mongoose.connect(
  config.database,
  { useNewUrlParser: true }
);
let db = mongoose.connection;

db.once("open", () => {
  console.log("Connected to MongoDB");
});

db.on("error", err => {
  console.log(err);
});

app.use(require("connect-flash")());
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
);
app.use((req, res, next) => {
  res.locals.messages = require("express-messages")(req, res);
  next();
});
app.use(
  expressValidator({
    errorFormatter: (param, msg, value) => {
      var namespace = param.split("."),
        root = namespace.shift(),
        formParam = root;

      while (namespace.length) {
        formParam += "[" + namespace.shift() + "]";
      }
      return {
        param: formParam,
        msg: msg,
        value: value
      };
    }
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("*", (req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.set("views", path.join(__dirname, "server/views"));
app.set("view engine", "pug");

app
  .use("/", indexRoute)
  .use("/signup", signupRoute)
  .use("/home", homeRoute)
  .use("/fundtransfer", fundtransferRoute)
  .use("/checkbalance", checkbalanceRoute)
  .use("/deposit", depositRoute)
  .use("/withdraw", withdrawRoute)
  .use("/billspayment", billspaymentRoute)
  .use("/transactionhistory", transactionhistoryRoute);

app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.log(`Listening to port: ${port}`);
});
