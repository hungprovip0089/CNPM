var mongoose = require('mongoose');

var tableSchema = new mongoose.Schema({
    id : String,
    areaId: String,
    maxGuest: Number,
<<<<<<< HEAD
    status: Boolean
=======
    status: bool
>>>>>>> 910f2b9860331684c5090d40467fa3090886a495
});

var Table = mongoose.model('Table', tableSchema, 'tables');

module.exports = Table;