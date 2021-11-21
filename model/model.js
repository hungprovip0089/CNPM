const Employee = require("./employee.model.js");
const Food = require("./food.model.js");
const Order = require("./order.model.js");
const Request = require("./request.model.js");
const Receipt = require("./receipt.model.js");
const Table = require("./table.model.js");
=======
const Server = require("./server.model.js")
const Food = require("./food.model.js");
>>>>>>> 910f2b9860331684c5090d40467fa3090886a495

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

<<<<<<< HEAD
module.exports.createEmployee = async (employee) => {
    return new Promise((resolve,reject)=>{
        Employee.insertMany(employee, function(err){
=======
module.exports.createServer = async (server) => {
    return new Promise((resolve,reject)=>{
        Server.insertMany(server, function(err){
>>>>>>> 910f2b9860331684c5090d40467fa3090886a495
            if(err){
                console.log(err);
                resolve(-1);
            }
        })
    });
<<<<<<< HEAD
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

module.exports.createFood = async (food) =>{
    return new Promise((resolve,reject) => {
        Food.insertMany(food, function(err){
            if(err){
                console.log(err);
                resolve(-1);
            }
        })
    });
}

module.exports.createTable = async (table) =>{
    return new Promise((resolve,reject) => {
        Table.insertMany(table, function(err){
            if(err){
                console.log(err);
                resolve(-1);
            }
        })
    });
}
=======
};
>>>>>>> 910f2b9860331684c5090d40467fa3090886a495
