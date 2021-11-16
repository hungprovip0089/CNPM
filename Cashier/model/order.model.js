var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    id : String,
    tableId: String,
    cart: [],
    status: Boolean,
    total: Number
});

var Order = mongoose.model('Order', orderSchema, 'orders');

module.exports = Order;