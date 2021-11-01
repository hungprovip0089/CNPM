const express = require('express');
const mongoose = require('mongoose');
const app = express();
const ejs = require('ejs');

const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

mongoose.connect('mongodb+srv://Kang:110401@chef.neyua.mongodb.net/Restaurant?retryWrites=true&w=majority');
const OrdersSchema = {
	order_id: String,
	status: String,
	items: Array
}
const Order = mongoose.model('Order', OrdersSchema);

Order.find({status: "waiting"}, function(err, Waits) {
	 waitingList = Waits
});
Order.find({status: "confirmed"}, function(err, Orders) {
		confirmedList = Orders
});		

app.get('/', (req, res) => {
	res.render('index', {
			ConfirmedList: confirmedList,
			WaitingList: waitingList
		})
})

app.listen(port, function(){
	console.log('Server is running ...');
})
