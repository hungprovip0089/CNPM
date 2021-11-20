const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
  id : String,
  tableId: String,
  receiptId: String,
  cart: [],
  status: String,
  total: Number
});

module.exports = mongoose.model('Order', ordersSchema);

