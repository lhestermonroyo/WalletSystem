  let mongoose = require("mongoose");

let accountsSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  balance: {
    type: Number,
    required: true
  }
});

let accounts = (module.exports = mongoose.model("accounts", accountsSchema));
