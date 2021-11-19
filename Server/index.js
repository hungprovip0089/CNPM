
require("dotenv").config();
var cookieParser = require('cookie-parser');
const { response } = require("express");
var express = require("express");
var app = express();
const port = process.env.PORT || 3000;
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');


// mongoose.connect(process.env.MONGO_URL);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


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

var Request = require('./model/request.model'); 
var Table = require('./model/table.model'); 
var listRequest;
var listTable;

Request.find({status: false}, function(err, data) {
    if (err) {console.log(err);}
    listRequest = data;
});

Table.find({}, function(err, data) {
    if (err) {console.log(err);}
    listTable = data;
});

app.get('/server', function(req,res){

    res.render('index',{
        listRequest: listRequest,
        listTable: listTable,
        requests: [],
        tables: []
    })
});

// information of each request base on request id
app.get('/server/request/:id', function(req,res){
    Request.find({_id: req.params.id}, (err, requests) => {
        if (err) {
            console.log(err);
        } else {
            res.render('index',{
                listRequest: listRequest,
                requests: requests,
                listTable: listTable,
                tables: [] 
            });
        }
    });

    

});

// information of each table base on table id
app.get('/server/table/:id', function(req,res){
    Table.find({_id: req.params.id}, (err, tables) => {
        if (err) {
            console.log(err);
        } else {
            console.log("reload");
            res.render('index',{
                listTable: listTable,
                tables: tables,
                listRequest: listRequest,
                requests: []
            })
        }
    });
});

// Update the status of request
app.get('/server/request/update/:id', function(req,res){
    Request.findByIdAndUpdate({_id: req.params.id}, {status: true}, function(err, request){
        if(err) return handleError(err);
    });
    Request.find({status: false}, function(err,data) {
        listRequest = data;
    });
    res.redirect('/server/');
});

// Update the status of table
app.get('/server/table/update/:id', async function(req,res){
    
    /*let flag = true;

    if(true){
        Table.findByIdAndUpdate({_id: req.params.id , status: false}, {status: true}, function(err, table){
            if(err) return handleError(err);
            flag = false;
            console.log(table);
        });
    }

    if(flag){
        Table.findByIdAndUpdate({_id: req.params.id , status: true}, {status: false}, function(err, table){
            if(err) return handleError(err);
        });
    }   */
    var table = await Table.findById({_id: req.params.id})
    
    Table.findByIdAndUpdate({_id: req.params.id}, {status: !table.status}, function(err, table){
        if(err) return handleError(err);
        console.log(table);
    });

    Table.find({}, function(err,data) {
        listTable = data;
    });

    
    res.redirect('/server/');

});


app.listen(port, function(){
    console.log('Welcome to port '+ port);
});
