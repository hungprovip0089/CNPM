var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    id : String,
    tableId: String,
<<<<<<< HEAD
    receiptId: String,
    cart: [],
    status: String,
=======
    cart: [],
    status: Boolean,
>>>>>>> 910f2b9860331684c5090d40467fa3090886a495
    total: Number
});

var Order = mongoose.model('Order', orderSchema, 'orders');

module.exports = Order;