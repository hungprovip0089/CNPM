var express = require('express');
var router = express.Router();
var controller = require('../controllers/customer.controller.js');

router.get('/:tableId' , controller.showMenu);

router.post('/:tableId' ,  controller.sendOrder);

router.post('/:tableId/service', controller.callService);

router.post('/:tableId/payment', controller.makePayment);

router.get('/:tableId/search', controller.filter);

module.exports = router;

