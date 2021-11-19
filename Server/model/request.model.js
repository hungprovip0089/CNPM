var mongoose = require('mongoose');

var requestSchema = new mongoose.Schema({
    id : String,
    status: Boolean,
    typ: String,
    tableId: String
});

var Request = mongoose.model('Request', requestSchema, 'requests');

module.exports = Request;