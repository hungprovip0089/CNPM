require('../models/database');
const Order = require('../models/Order');
const Food = require('../models/Food');
const Request = require('../models/Request');


/**
 * GET /
 * Orders
*/
exports.homepage = async(req, res) => {
  try {
    const limitNumber = 5;
    const waitingList = await Order.find({ 'status': "waiting" }).limit(limitNumber);
    const confirmedList = await Order.find({ 'status': "confirmed" }).limit(limitNumber);

    const orderList = { waitingList, confirmedList };

    res.render('index', { title: 'Orders', orderList } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
}

/**
 * GET /orders/:status
 * Order Categories By Status
*/
exports.exploreCategoriesByStatus = async(req, res) => { 
  try {
    let orderStatus = req.params.status;
    const limitNumber = 20;
    const categoryByStatus = await Order.find({ 'status': orderStatus }).limit(limitNumber);
    res.render('order-categories', { title: 'Order Categoreis', categoryByStatus } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
} 

/**
 * GET /orderdetailWai/:id
 * Waiting Order Detail 
*/
exports.exploreDetailW = async(req, res) => {
  try {
    let orderId = req.params.id;
    const detail = await Order.findById(orderId);
    res.render('order-detail-wait', { title: 'Order Detail', detail } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
} 

/**
 * GET /orderdetailConf/:id
 * Confirmed Order Detail 
*/
exports.exploreDetailC = async(req, res) => {
  try {
    let orderId = req.params.id;
    const detail = await Order.findById(orderId);
    res.render('order-detail-conf', { title: 'Order Detail', detail } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
} 

/**
 * GET /accecptOrder/:id
 * Accept Order
*/
exports.acceptO = async(req, res) => {
  try {
    let orderId = req.params.id;
    const detail = await Order.findById(orderId);
    res.render('order-detail', { title: 'Accecpt Order', detail } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
}

/**
 * POST /accecptOrder/:id
 * Accept Order
*/
exports.acceptOrder = async(req, res) => { 
  let orderId = req.params.id;
  Order.findOneAndUpdate({"_id": orderId}, {$set:{status:"confirmed"}}, function(err, doc){
    if(err){
        console.log("Something wrong when updating data!");
    }
    console.log(doc); });
  res.redirect('/');
} 

/**
 * GET /declineOrder/:id
 * Decline Order
*/
exports.decline = async(req, res) => {
  try {
    let orderId = req.params.id;
    const detail = await Order.findById(orderId);
    res.render('order-detail', { title: 'Decline Order', detail } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
}

/**
 * POST /declineOrder/:id
 * Decline Order
*/
exports.declineOrder = async(req, res) => { 
  let orderId = req.params.id;
  Order.findOneAndUpdate({"_id": orderId}, {$set:{status:"rejected"}}, function(err, doc){
    if(err){
        console.log("Something wrong when updating data!");
    }
    console.log(doc); });
  res.redirect('/');

} 

/**
 * GET /doneOrder/:id
 * 
*/
exports.done = async(req, res) => {
  try {
    let orderId = req.params.id;
    const detail = await Order.findById(orderId);
    res.render('order-detail', { title: 'Done Order', detail } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
}

/**
 * POST doneOrder/:id
 * Doneorder and pull request to server
*/
exports.doneOrder = async(req, res) => { 
  let orderId = req.params.id;
  const doneOrder = await Order.findById(orderId);
  const newRequest = new Request({id: "C"+doneOrder.id,
                                  status: false,
                                  type: "chef",
                                  fromTableId: doneOrder.tableId});
  await newRequest.save();
  Order.findOneAndUpdate({"_id": orderId}, {$set:{status:"done"}}, function(err, doc){
    if(err){
        console.log("Something wrong when updating data!");
    }

    console.log(doc); });
  res.redirect('/');

} 

/**
 * GET /menu
 * Show menu for update status
*/
exports.Menu = async(req, res) => { 
  try {
    const foodList = await Food.find({})
    res.render('list-food', { title: 'Food Categoreis', foodList } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
} 

/**
 * GET /updatemenu:id
 * Update Menu
*/
exports.update = async(req, res) => {
  try {
    let orderId = req.params.id;
    const detail = await Food.findById(orderId);
    res.render('list-food', { title: 'Menu', detail } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
}

/**
 * POST /updatemenu/:id
 * Update Menu
*/
exports.updateMenu = async(req, res) => { 
  let foodId = req.params.id;
  Food.findOneAndUpdate({"_id": foodId, "status":"available"}, {$set:{status:"unavailable"}}, function(err, doc){
    if(err){
        console.log("Something wrong when updating data!");
    }
    console.log(doc); });
  Food.findOneAndUpdate({"_id": foodId, "status":"unavailable"}, {$set:{status:"available"}}, function(err, doc){
    if(err){
        console.log("Something wrong when updating data!");
    }
    console.log(doc); });
  res.redirect('/menu');
} 