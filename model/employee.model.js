var mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
    id : String,
    name: String,
    type: String,
    gender: Boolean,
    birthday: Date,
    email: String,
    phone: String,
    areaId: String,
    username: String,
    pwd: String
});

var Employee = mongoose.model('Employee', employeeSchema, 'employees');

module.exports = Employee;