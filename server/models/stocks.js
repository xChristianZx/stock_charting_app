const mongoose = require("mongoose");
const { Schema } = mongoose;

const stocksSchema = new Schema({
  symbol: Sting,
  DateAdded: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("stocks", stocksSchema);
