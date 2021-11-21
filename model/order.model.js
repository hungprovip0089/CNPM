var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    id : String,
    tableId: String,
    receiptId: String,
    cart: [],
    status: String,
    total: Number
});

var Order = mongoose.model('Order', orderSchema, 'orders');

module.exports = Order;