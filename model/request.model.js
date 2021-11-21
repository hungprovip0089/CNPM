var mongoose = require('mongoose');

var requestSchema = new mongoose.Schema({
    id : String,
<<<<<<< HEAD
    status: Boolean,
=======
    status: bool,
>>>>>>> 910f2b9860331684c5090d40467fa3090886a495
    type: String,
    fromTableId: String
});

var Request = mongoose.model('Request', requestSchema, 'requests');

module.exports = Request;