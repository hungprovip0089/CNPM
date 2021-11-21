var utility = require("../controllers/utility.js");
var Employee = require("../model/employee.model.js");
var Food = require("../model/food.model.js");
const Table = require("../model/table.model.js");

module.exports.showEmployee = function(req, res){
    Employee.find().then(function(employees){
        res.render('manager/manageEmployee',{
            employees : employees
        })
    })
};


module.exports.createEmployee = async function(req, res){
    const newemp = req.body;
    const number = await Employee.countDocuments();
    newemp['id'] = "NV" + number;
    let id = utility.Employee.createEmployee(newemp);
    if(id<0){
        console.log('Create employee FAILED');
    }
    else{
        console.log('Create employee SUCCESSFUL');
    }
    res.redirect('/manager/manageEmployee');
};

module.exports.showFood = function(req, res){
    Food.find().then(function(foods){
        res.render('manager/manageFood',{
            foods : foods
        })
    })
};

module.exports.createFood = async function(req,res){
    const newFood = req.body;
    const number = await Food.countDocuments();
    newFood['id'] = "FOOD" + number;
    newFood['status'] = newFood['status'] == 'true';
    newFood['type'] = newFood['type'].split(',');
    let id = utility.Food.createFood(newFood);
    if(id<0){
        console.log('Create food FAILED');
    }
    else{
        console.log('Create food SUCCESSFUL');
    }
    res.redirect('/manager/manageFood');
};

module.exports.showTable = function(req, res){
    Table.find().then(function(tables){
        res.render('manager/manageTable',{
            tables : tables
        })
    })
};

module.exports.createTable = async function(req,res){
    const newTable = req.body;
    const number = await Table.countDocuments();
    newTable['id'] = "TABLE" + number;
    newTable['status'] = newTable['status'] == 'true';
    let id = utility.Table.createTable(newTable);
    if(id<0){
        console.log('Create table FAILED');
    }
    else{
        console.log('Create table SUCCESSFUL');
    }
    res.redirect('/manager/manageTable');
};