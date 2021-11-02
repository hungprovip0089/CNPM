var mongoose = require('mongoose');

var requestSchema = new mongoose.Schema({
    id : String,
    status: bool,
    type: String,
    fromTableId: String
});

var Request = mongoose.model('Request', requestSchema, 'requests');

module.exports = Request;