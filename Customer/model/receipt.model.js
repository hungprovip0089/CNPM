var mongoose = require('mongoose');

var receiptSchema = new mongoose.Schema({
    id : String,
    date: Date,
    listOrder: [],
    totalCost: Number,
    paymentMethod: String,
    status: bool,
    feedback: string
});

var Receipt = mongoose.model('Receipt', receiptSchema, 'receipts');

module.exports = Receipt;