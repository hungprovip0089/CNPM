// npm install nodemon express express-handlebars method-override body-parser cookie-parser dotenv jquery lowdb mongoose mongoose-type-url pug shortid url ejs


require("dotenv").config();
var cookieParser = require('cookie-parser');
const { response } = require("express");
var express = require("express");
var app = express();
const port = process.env.PORT || 3000;
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
const ejs = require('ejs');
// const expressLayoutes = require('express-ejs-layouts');
const path = require('path');


// mongoose.connect(process.env.MONGO_URL);
// app.use(expressLayoutes);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser('meowmeowmeowruamatnhumeo'));


app.set('view engine', 'ejs');
app.use(express.static(__dirname));

// #############################################################################


mongoose.connect('mongodb://localhost/restaurant');
let db = mongoose.connection;

// Check connection
db.once('open', function() {
    console.log('Connected to MongoDB');
});

// Check for DB error
db.on('error', console.error.bind(console, 'connection error:'));



// Check spell model or models folder
// The data type is wrong: Boolean and String, capital B and S
// Throw the .model in name of file
let Receipt = require('./model/receipt.model'); // receipts -> the last (s)
// let Cashier = require('./model/cashier.model');


var listReceipt;

Receipt.find({status: false}, function(err, data) {
    listReceipt = data;
});

// Cashier have their id for hello <name> or we can use together
app.get('/cashier', function(req,res){

    res.render('index',{
        listReceipt: listReceipt, //The left space is empty
        receipts: [],
    })    
});

app.get('/cashier/:id', function(req,res){
    Receipt.find({_id: req.params.id}, (err, receipts) => {
    if (err) {
        console.log(err);
    } else {
        res.render('index',{
            listReceipt: listReceipt,
            receipts: receipts //a ele not array
        })
    }
    });

});

// Update the status of receipt

app.get('/cashier/update/:id', function(req,res){
    console.log(req.params.id);
    Receipt.findByIdAndUpdate({_id: req.params.id}, {status: true}, function(err, receipt){
        if(err) return handleError(err);
    });
    Receipt.find({status: false}, function(err, data) {
        listReceipt = data;
    });
    res.redirect('/cashier/');
});


app.listen(port, function(){
    console.log('Welcome to port '+ port);
});


