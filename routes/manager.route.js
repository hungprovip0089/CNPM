var express = require('express');
var router = express.Router();
var controller = require('../controllers/manager.controller.js')


router.get('/' , function(req,res){
    res.render('manager/dashboard');
});

router.get('/manageEmployee', controller.showEmployee);

router.post('/manageEmployee', controller.createEmployee);

router.get('/manageFood', controller.showFood);

router.post('/manageFood', controller.createFood);

router.get('/manageTable', controller.showTable);

router.post('/manageTable', controller.createTable);

module.exports = router;