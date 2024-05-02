const mongoose = require('mongoose');

const supportTicketschema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: String,
  name: String,
  issue_description: String,
  issue_img: String,
  status: Number,
  created_at: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('supportTickets', supportTicketschema);