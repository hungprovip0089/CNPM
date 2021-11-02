const Server = require("./server.model.js")
const Food = require("./food.model.js");

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