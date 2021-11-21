const express = require('express');
const router = express.Router();
const controller = require('../controllers/server.controller.js');

router.get('/', controller.showServerInterface);

router.get('/request/:id', controller.showRequestDetail);

router.get('/table/:id', controller.showTableDetail);

router.get('/request/update/:id', controller.updateRequest);

router.get('/table/update/:id', controller.updateTable);

module.exports = router;