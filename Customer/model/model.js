const Server = require("./server.model.js");
const Food = require("./food.model.js");
const Order = require("./order.model.js");
const Request = require("./request.model.js");
const Receipt = require("./receipt.model.js");

module.exports.createFood = async (food) =>{
    return new Promise((resolve,reject)=>{
        Food.insertMany(food, function(err){
            if(err) {
                console.log(err)
                resolve(-1)
            }
        })
    });
};

module.exports.createServer = async (server) => {
    return new Promise((resolve,reject)=>{
        Server.insertMany(server, function(err){
            if(err){
                console.log(err);
                resolve(-1);
            }
        })
    });
};

module.exports.createOrder = async (order) => {
    return new Promise((resolve,reject) => {
        Order.insertMany(order, function(err){
            if(err){
                console.log(err);
                resolve(-1);
            }
        })
    });
};

module.exports.createRequest = async (request) => {
    return new Promise((resolve,reject) => {
        Request.insertMany(request, function(err){
            if(err){
                console.log(err);
                resolve(-1);
            }
        })
    });
};

module.exports.createReceipt = async (receipt) => {
    return new Promise((resolve,reject) => {
        Receipt.insertMany(receipt, function(err){
            if(err){
                console.log(err);
                resolve(-1);
            }
        })
    });
}