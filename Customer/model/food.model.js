var mongoose = require('mongoose');

var foodSchema = new mongoose.Schema({
    id : String,
    name: String,
    status: Boolean,
    price: Number,
    description: String,
    image: String,
    type: [String]
});

var Food = mongoose.model('Food', foodSchema, 'foods');

module.exports = Food;