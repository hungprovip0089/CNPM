var mongoose = require('mongoose');

var cashierSchema = new mongoose.Schema({
    id : String,
    firstName: String,
    lastName: String,
    gender: Boolean,
    birthday: Date,
    email: String,
    phone: String,
    areaId: String,
    listReceipt: [],
    username: String,
    pwd: String
});

var Cashier = mongoose.model('Cashier', cashierSchema, 'cashiers');

module.exports = Cashier;