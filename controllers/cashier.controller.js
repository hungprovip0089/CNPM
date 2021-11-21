var Receipt = require("../model/receipt.model.js");

module.exports.showReceipt = function(req,res){
    Receipt.find({status: false}).then(function(listReceipt){
        res.render('cashier/index',{
            listReceipt: listReceipt,
            receipts: [],
        });
    });
};

module.exports.showReceiptDetail = async function(req,res){
    var listReceipt = await Receipt.find({status: false}).exec();
    Receipt.find({id: req.params.id}).then(function(receipts){
        res.render('cashier/index',{
            listReceipt: listReceipt,
            receipts: receipts,
        });
    });
};

module.exports.updateStatusReceipt = function(req,res){
    Receipt.findOneAndUpdate({id : req.params.id}, {status : true}).then(function(receipt){
        res.redirect('/cashier');
    });
};

module.exports.printReceipt = function(req,res){
    var printWin = window.open();
    printWin.document.write();
    printWin.stop();
    printWin.print();
    printWin.close();
};