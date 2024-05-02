const mongoose = require('mongoose');

const paymentschema = new mongoose.Schema({
  user_id : String,
  amount : String,
  payment_id: String,
  order_id : String,
  signature: String,
  subscription : {
    type: String,
    default: null
  },
  subscription_start_date : {
    type: Date,
    default: null
  },
  subscription_end_date : {
    type: Date,
    default: null
  }
});

module.exports = mongoose.model('paymentHistory', paymentschema);