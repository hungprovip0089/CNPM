const Order = require('../model/order.model.js');
const Food = require('../model/food.model.js');
const Request = require('../model/request.model.js');


/**
 * GET /
 * Orders
*/
module.exports.homepage = async(req, res) => {
  try {
    const limitNumber = 5;
    const waitingList = await Order.find({ 'status': "waiting" }).limit(limitNumber);
    const confirmedList = await Order.find({ 'status': "confirmed" }).limit(limitNumber);

    const orderList = { waitingList, confirmedList };

    res.render('chef/index', { title: 'Orders', orderList } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
}

/**
 * GET /orders/:status
 * Order Categories By Status
*/
module.exports.exploreCategoriesByStatus = async(req, res) => { 
  try {
    let orderStatus = req.params.status;
    const limitNumber = 20;
    const categoryByStatus = await Order.find({ 'status': orderStatus }).limit(limitNumber);
    res.render('chef/order-categories', { title: 'Order Categoreis', categoryByStatus } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
} 

/**
 * GET /orderdetailWai/:id
 * Waiting Order Detail 
*/
module.exports.exploreDetailW = async(req, res) => {
  try {
    let orderId = req.params.id;
    const detail = await Order.findOne({id: orderId}).exec();
    res.render('chef/order-detail-wait', { title: 'Order Detail', detail } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
} 

/**
 * GET /orderdetailConf/:id
 * Confirmed Order Detail 
*/
module.exports.exploreDetailC = async(req, res) => {
  try {
    let orderId = req.params.id;
    const detail = await Order.findOne({id : orderId}).exec();
    res.render('chef/order-detail-conf', { title: 'Order Detail', detail } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
} 

/**
 * GET /accecptOrder/:id
 * Accept Order
*/
module.exports.acceptO = async(req, res) => {
  try {
    let orderId = req.params.id;
    const detail = await Order.findOne({id : orderId}).exec();
    res.render('chef/order-detail', { title: 'Accecpt Order', detail } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
}

/**
 * POST /accecptOrder/:id
 * Accept Order
*/
module.exports.acceptOrder = async(req, res) => { 
  let orderId = req.params.id;
  Order.findOneAndUpdate({"id": orderId}, {$set:{status:"confirmed"}}, function(err, doc){
    if(err){
        console.log("Something wrong when updating data!");
    }
    console.log(doc); });
  res.redirect('/chef');
} 

/**
 * GET /declineOrder/:id
 * Decline Order
*/
module.exports.decline = async(req, res) => {
  try {
    let orderId = req.params.id;
    const detail = await Order.findOne({id : orderId}).exec();
    res.render('chef/order-detail', { title: 'Decline Order', detail } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
}

/**
 * POST /declineOrder/:id
 * Decline Order
*/
module.exports.declineOrder = async(req, res) => { 
  let orderId = req.params.id;
  Order.findOneAndUpdate({"id": orderId}, {$set:{status:"rejected"}}, function(err, doc){
    if(err){
        console.log("Something wrong when updating data!");
    }
    console.log(doc); });
  res.redirect('/chef');

} 

/**
 * GET /doneOrder/:id
 * 
*/
module.exports.done = async(req, res) => {
  try {
    let orderId = req.params.id;
    const detail = await Order.findOne({id : orderId}).exec();
    res.render('chef/order-detail', { title: 'Done Order', detail } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
}

/**
 * POST doneOrder/:id
 * Doneorder and pull request to server
*/
module.exports.doneOrder = async(req, res) => { 
  let orderId = req.params.id;
  const doneOrder = await Order.findOne({id:orderId}).exec();
  const newRequest = new Request({id: "C"+doneOrder.id,
                                  status: false,
                                  type: "chef",
                                  fromTableId: doneOrder.tableId});
  await newRequest.save();
  Order.findOneAndUpdate({"id": orderId}, {$set:{status:"done"}}, function(err, doc){
    if(err){
        console.log("Something wrong when updating data!");
    }

    console.log(doc); });
  res.redirect('/chef');

} 

/**
 * GET /menu
 * Show menu for update status
*/
module.exports.Menu = async(req, res) => { 
  try {
    const foodList = await Food.find({})
    res.render('chef/list-food', { title: 'Food Categoreis', foodList } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
} 

/**
 * GET /updatemenu:id
 * Update Menu
*/
module.exports.update = async(req, res) => {
  try {
    let orderId = req.params.id;
    const detail = await Food.findOne({id : orderId}).exec();
    res.render('chef/list-food', { title: 'Menu', detail } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
}

/**
 * POST /updatemenu/:id
 * Update Menu
*/
module.exports.updateMenu = async(req, res) => { 
  let foodId = req.params.id;
  var status = !(req.body.foodStatus == 'true');
  console.log(status);
  Food.findOneAndUpdate({"id": foodId}, {$set:{status:status}}, function(err, doc){
    if(err){
        console.log("Something wrong when updating data!");
    }
  });
  res.redirect('/chef/menu');
} 