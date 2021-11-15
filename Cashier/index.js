// npm install nodemon express express-handlebars method-override body-parser cookie-parser dotenv jquery lowdb mongoose mongoose-type-url pug shortid url ejs

require('dotenv').config();
var cookieParser = require('cookie-parser');
const { response } = require("express");
var express = require("express");
var app = express();
const port = process.env.PORT || 3000;
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
const ejs = require('ejs');


// mongoose.connect(process.env.MONGO_URL);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('meowmeowmeowruamatnhumeo'));


app.set('view engine', 'ejs');
app.use(express.static('public'));


// mongoose.connect('mongodb+srv://Kang:110401@chef.neyua.mongodb.net/Restaurant?retryWrites=true&w=majority');
// const OrdersSchema = {
// 	order_id: String,
// 	status: String,
// 	items: Array
// }
// const Order = mongoose.model('Order', OrdersSchema);

app.get('/', function(req,res){
    res.render('index')
});

// app.post('/', controller.login);

// app.use('/customer' ,customerRoute);

// app.use('/manager', managerRoute);


app.listen(port, function(){
    console.log('Welcome to port '+ port);
});