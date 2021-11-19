var mongoose = require('mongoose');

var serverSchema = new mongoose.Schema({
    id : String,
    firstName: String,
    lastName: String,
    gender: Boolean,
    birthday: Date,
    email: String,
    phone: String,
    areaId: String,
    username: String,
    pwd: String
});

var Server = mongoose.model('Server', serverSchema, 'servers');

module.exports = Server;