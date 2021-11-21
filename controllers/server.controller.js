var Request = require("../model/request.model.js");
var Table = require("../model/table.model.js");

module.exports.showServerInterface = async function(req,res){
    var listRequest = await Request.find({status: false});
    var listTable = await Table.find();
    res.render('server/index',{
        listRequest: listRequest,
        listTable: listTable,
        requests: [],
        tables: []
    })
};

module.exports.showRequestDetail = async function(req,res){
    var listRequest = await Request.find({status: false});
    var listTable = await Table.find();
    Request.find({id: req.params.id}, (err, requests) => {
        if (err) {
            console.log(err);
        } else {
            res.render('server/index',{
                listRequest: listRequest,
                requests: requests,
                listTable: listTable,
                tables: [] 
            });
        }
    });
};

module.exports.showTableDetail = async function(req,res){
    var listRequest = await Request.find({status: false});
    var listTable = await Table.find();
    Table.find({id: req.params.id}, (err, tables) => {
        if (err) {
            console.log(err);
        } else {
            console.log("reload");
            res.render('server/index',{
                listTable: listTable,
                tables: tables,
                listRequest: listRequest,
                requests: []
            })
        }
    });
};

module.exports.updateRequest = async function(req,res){
    Request.findOneAndUpdate({id: req.params.id}, {status: true}, function(err, request){
        if(err) return handleError(err);
    });
    listRequest = await Request.find({status: false});
    res.redirect('/server');
};

module.exports.updateTable = async function(req,res){
    var table = await Table.findOne({id: req.params.id});

    Table.findOneAndUpdate({id: req.params.id}, {status: !table.status}, function(err, table){
        if(err) return handleError(err);
        console.log(table);
    });

    res.redirect('/server');
};