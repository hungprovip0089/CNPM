var mongoose = require('mongoose');

<<<<<<< HEAD

var receiptSchema = new mongoose.Schema({
    id : String,
    date: Date,
    listOrder: [],
=======
var receiptSchema = new mongoose.Schema({
    id : String,
    time: Date,
    listOrder: [{
        name: String,
        quantity: Number,
        price: Number,
    }],
>>>>>>> 910f2b9860331684c5090d40467fa3090886a495
    totalCost: Number,
    paymentMethod: String,
    status: Boolean,
    feedback: String
});

var Receipt = mongoose.model('Receipt', receiptSchema, 'receipts');

module.exports = Receipt;