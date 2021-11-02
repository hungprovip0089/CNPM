var express = require('express');
var router = express.Router();
var controller = require('../controllers/manager.controller.js')


router.get('/' , function(req,res){
    res.render('manager/dashboard');
});

router.get('/manageServer', controller.manageServer);

router.post('/manageServer/createServer', controller.createServer);

module.exports = router;