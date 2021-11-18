var mongoose = require('mongoose');

var receiptSchema = new mongoose.Schema({
    id : String,
    time: Date,
    listOrder: [{
        name: String,
        quantity: Number,
        price: Number,
    }],
    totalCost: Number,
    paymentMethod: String,
    status: Boolean,
    feedback: String
});

var Receipt = mongoose.model('Receipt', receiptSchema, 'receipts');

module.exports = Receipt;