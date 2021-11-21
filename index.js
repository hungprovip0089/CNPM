require('dotenv').config();
var cookieParser = require('cookie-parser');
var cors = require('cors');
var express = require("express");
var app = express();
const port = process.env.PORT || 3000;
var customerRoute = require('./routes/customer.route');
var cashierRoute = require('./routes/cashier.route');
var chefRoute = require('./routes/chef.route');
var managerRoute = require('./routes/manager.route');
var serverRoute = require('./routes/server.route');
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var controller = require('./controllers/login.controller.js');
var middleware = require('./middlewares/auth.middleware.js');
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

app.post('/', controller.login);

// app.post('/', controller.login);

app.use('/customer' ,customerRoute);
app.use('/cashier',middleware.isCashier, cashierRoute);
app.use('/chef' ,middleware.isChef, chefRoute);
app.use('/manager', middleware.isManager, managerRoute);
app.use('/server', middleware.isServer, serverRoute);

app.listen(port, function(){
    console.log('Welcome to port '+ port);
});