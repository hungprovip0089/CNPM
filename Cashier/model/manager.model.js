var mongoose = require('mongoose');

var managerSchema = new mongoose.Schema({
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

var Manager = mongoose.model('Manager', managerSchema, 'managers');

module.exports = Manager;