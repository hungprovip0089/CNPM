const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  id : String,
  name: String,
  status: String,
  price: Number,
  description: String,
  image: String,
  type: [String]
});

module.exports = mongoose.model('Food', foodSchema);

