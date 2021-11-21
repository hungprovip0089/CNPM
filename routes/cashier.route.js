var express = require('express');
var router = express.Router();
var controller = require('../controllers/cashier.controller.js');

router.get('/', controller.showReceipt);

router.get('/:id', controller.showReceiptDetail);

router.get('/update/:id', controller.updateStatusReceipt);

router.get('/cashier/print/:id', controller.printReceipt);

module.exports = router;