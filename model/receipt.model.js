var mongoose = require('mongoose');


var receiptSchema = new mongoose.Schema({
    id : String,
    date: Date,
    listOrder: [],
    totalCost: Number,
    paymentMethod: String,
    status: Boolean,
    feedback: String
});

var Receipt = mongoose.model('Receipt', receiptSchema, 'receipts');

module.exports = Receipt;