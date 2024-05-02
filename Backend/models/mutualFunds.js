const mongoose = require("mongoose");

const mutualFundschema = new mongoose.Schema({
  scheme_name: String,
  benchmark: String,
  riskometer_scheme: String,
  riskometer_benchmark: String,
  Nav_date: String,
  Nav_regular: {
    type: Number,
  },
  Nav_direct: {
    type: Number,
  },
  return_1yearpercent_regular: {
    type: Number,
  },
  return_1yearpercent_direct: {
    type: Number,
  },
  return_1yearpercent_benchmark: {
    type: Number,
  },
  return_3yearpercent_regular: {
    type: Number,
  },
  return_3yearpercent_direct: {
    type: Number,
  },
  return_3yearpercent_benchmark: {
    type: Number,
  },
  return_5yearpercent_regular: {
    type: Number,
  },
  return_5yearpercent_direct: {
    type: Number,
  },
  return_5yearpercent_benchmark: {
    type: Number,
  },
  return_10yearpercent_regular: {
    type: Number,
  },
  return_10yearpercent_direct: {
    type: Number,
  },
  return_10yearpercent_benchmark: {
    type: Number,
  },
  return_sincelaunch_regular: {
    type: Number,
  },
  return_sincelaunch_direct: {
    type: Number,
  },
  return_sincelaunch_benchmark: {
    type: Number,
  },
});

module.exports = mongoose.model("mutualFunds", mutualFundschema);
