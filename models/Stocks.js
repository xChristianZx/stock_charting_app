const mongoose = require('mongoose');
const { Schema } = mongoose;

const stockSchema = new Schema({
  symbol: { type: String, unique: true },
  DateAdded: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('stocks', stockSchema);
