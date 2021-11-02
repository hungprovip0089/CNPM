var Food = require('../model/food.model.js');
// var Order = require('../model/order.model.js');

// module.exports.addOrderElement = function(orderId, orderEleId){
//     var orderElement = Food.findOne({id: orderEleId},function(req,res){
//         if(err) err;
//     });
//     Order.findOneAndUpdate(
//         {id: orderId},
//         {$push: {'food': orderElement, 'number': Int16Array}},
//         {safe :true , upsert : true},function(err){
//             if(err) err;
//         }
//     )
//     res.redirect('/customer');
// }

module.exports.showMenu = function(req, res){
    Food.find().then(function(foods){
        res.render('customer/dashboard',{
            foods: foods,
            type: "All"
        })
    })
};

module.exports.filter = function(req,res){
    var filter = req.query.filter;
    console.log(filter)
    Food.find(
        {
            type:{
                $all:[filter]
            }
        }
    ).then(function(foods){
        res.render('customer/dashboard',{
            type : filter,
            foods : foods
        })
    })
};