const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: String,
  password : String,
  name: String,
  mobile_number: String,
  pan_no: String,
  status: Number,
  role: Number,
  created_at: {
    type: Date,
    default: Date.now
  },
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

module.exports = mongoose.model('users', userschema);