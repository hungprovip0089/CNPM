var express = require('express');
var router = express.Router();
var controller = require('../controllers/customer.controller.js');
// var middleware = require('../middlewares/auth.middleware.js')

router.get('/', controller.showMenu);

router.get('/search', controller.filter)

// router.post('/addOrderElement', controller.addOrderElement);

module.exports = router;

