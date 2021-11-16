var Food = require('../model/food.model.js')
var model = require('../model/model.js')


module.exports.Food = class {
    static async createFood(food){
        return await model.createFood(food)
    }
}

module.exports.Server = class {
    static async createServer(server){
        return await model.createServer(server);
    }
}

module.exports.Order = class {
    static async createOrder(order){
        return model.createOrder(order);
    }
}

module.exports.Request = class {
    static async createRequest(request){
        return model.createRequest(request);
    }
}

module.exports.Receipt = class {
    static async createReceipt(receipt){
        return model.createReceipt(receipt);
    }
}