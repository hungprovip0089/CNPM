var mongoose = require('mongoose');

var tableSchema = new mongoose.Schema({
    id : String,
    areaId: String,
    maxGuest: Number,
    status: Boolean
});

var Table = mongoose.model('Table', tableSchema, 'tables');

module.exports = Table;