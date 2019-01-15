let mongoose = require("mongoose");

let transactionSchema = mongoose.Schema({
  transaction_type: {
    type: String,
    required: true
  },
  sender: {
    type: String,
    required: true
  },
  recepient: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

let transactions = (module.exports = mongoose.model(
  "transactions",
  transactionSchema
));
