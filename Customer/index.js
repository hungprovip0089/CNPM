require('dotenv').config();
var cookieParser = require('cookie-parser');
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


mongoose.connect(process.env.MONGO_URL);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser('meowmeowmeowruamatnhumeo'));

app.set('view engine','pug');
app.set('views','./views');
app.use('/static', express.static('public'))

app.get('/', function(req,res){
    res.render('index')
});

// app.post('/', controller.login);

app.use('/customer' ,customerRoute);

// app.use('/manager', managerRoute);


app.listen(port, function(){
    console.log('Welcome to port '+ port);
});