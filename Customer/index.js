require('dotenv').config();
var cookieParser = require('cookie-parser');
var cors = require('cors');
const { response } = require("express");
var express = require("express");
var app = express();
const port = process.env.PORT || 3000;
var customerRoute = require('./routes/customer.route');
// var managerRoute = require('./routes/manager.route');
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
// var controller = require('./controllers/login.controller.js');
// var middleware = require('./middlewares/auth.middleware.js');
const corsOption = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
}


mongoose.connect(process.env.MONGO_URL);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser('meowmeowmeowruamatnhumeo'));
app.use(cors(corsOption));

app.set('view engine','ejs');
app.set('views','./views');
app.use(express.static('public'));

app.get('/', function(req,res){
    res.render('index')
});

app.post('/', function(req,res){
    res.render('index')
});

// app.post('/', controller.login);

app.use('/customer' ,customerRoute);

// app.use('/manager', managerRoute);


app.listen(port, function(){
    console.log('Welcome to port '+ port);
});