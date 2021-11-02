var Food = require('../model/food.model.js')
var model = require('../model/model.js')


module.exports.Food = class {
    static async createFood(food){
        return await model.createFood(food)
    }
}

module.exports.Server = class{
    static async createServer(server){
        return await model.createServer(server);
    }
}