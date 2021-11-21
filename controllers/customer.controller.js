var Food = require('../model/food.model.js');
var utility = require("../controllers/utility.js");
var Order = require("../model/order.model.js");
var Request = require("../model/request.model.js");
var Table = require("../model/table.model.js");

module.exports.showMenu = async function(req, res){
    var tableId = req.params.tableId;
    Table.findOne({id: tableId}).then(function(tb){
        if(!tb) res.redirect('/');
        else{
            Food.find({status: true}).then(function(foods){
                res.render('customer/dashboard',{
                    foods: foods,
                    type: "All",
                    tableId: tableId
                })
            })
        }
    })
};

module.exports.filter = function(req,res){
    var tableId = req.params.tableId;
    var filter = req.query.filter;
    Food.find(
        {
            status: true,
            type:{
                $all:[filter]
            }
        }
    ).then(function(foods){
        res.render('customer/dashboard',{
            type : filter,
            foods : foods,
            tableId: tableId
        })
    })
};

module.exports.sendOrder = async function(req,res){
    var cart = req.body['cart'];
    var receiptId = req.body['receiptId'];
    var tableId = req.params.tableId;
    var total = 0;
    for(let i = 0 ; i < cart.length ; i++){
        cart[i]['price'] = parseInt(cart[i]['price']);
        cart[i]['itemsNumber'] = parseInt(cart[i]['itemsNumber']);
        total = total + parseInt(cart[i]['price'])*parseInt(cart[i]['itemsNumber']);
    }
    total = parseInt(total*1.1);
    var number = await Order.countDocuments();
    const order = {
        id: 'ORDER' + number,
        tableId: tableId,
        receiptId: receiptId,
        cart: cart,
        status: "waiting",
        total: total
    }
    let id = utility.Order.createOrder(order);

    if(id<0){
        console.log('Create order FAILED');
    }
    else{
        console.log('Create order SUCCESSFUL');
    }
    res.redirect('/customer/' + tableId);
};

module.exports.callService = async function(req,res){
    var number = await Request.countDocuments();
    var tableId = req.params.tableId;
    const request = {
        id: "REQUEST" + number,
        status: false,
        type: "CALL SERVICE",
        fromTableId: tableId
    }
    let id = utility.Request.createRequest(request);
    if(id<0){
        console.log('Create request FAILED');
    }
    else{
        console.log('Create request SUCCESSFUL');
    }
    res.redirect('/customer/' + tableId);
};

module.exports.makePayment = async function(req,res){
    var receiptId = req.body['receiptId'];
    var orders = await Order.find({'receiptId' : receiptId}).exec();
    if(orders.length == 0){
        res.send(JSON.stringify("nothing"));
        return;
    }

    var date = new Date();
    var total = 0;
    var listOrder = [];
    orders.forEach((el) => {
        total += el.total;
        el['cart'].forEach((item) => {
            var result = -1;
            result = listOrder.findIndex((product) => product.id == item.id);
            if(result>=0){
                listOrder[result]['itemsNumber'] += item['itemsNumber'];
            }
            else{
                listOrder.push(item);
            }
        })
    });
    
    const receipt = {
        id: receiptId,
        date: date,
        listOrder: listOrder,
        totalCost: total,
        paymentMethod: "CASH",
        status: false,
        feedback: ''
    }

    let id = utility.Receipt.createReceipt(receipt);
    if(id<0){
        console.log('Create receipt FAILED');
    }
    else{
        console.log('Create receipt SUCCESSFUL');
    }

    res.redirect('/');
};