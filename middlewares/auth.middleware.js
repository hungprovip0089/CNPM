var Employee = require('../model/employee.model.js');
// var SessionID = require('../model/sessionID.model.js')


// module.exports.hasSessionID = function(req,res,next){
//     if(!req.cookies.sessionID){
//         console.log("I dont have sessionID");
//         res.cookie('sessionID', '123456', {
//             signed: true
//         });
//     }
//     SessionID.insertMany({id: '123456', cart: []});
//     next();
// };

module.exports.isManager = function(req,res,next) {
    if(!req.signedCookies.userID){
        return res.redirect('/');
    }
    Employee.findOne({id: req.signedCookies.userID}, function(err,user){
        if(err) res.status(500).send(err);
        if(user.type!="manager") return res.redirect('/');
        else next();
    });
};

module.exports.isChef = function(req,res,next) {
    if(!req.signedCookies.userID){
        return res.redirect('/');
    }
    Employee.findOne({id: req.signedCookies.userID}, function(err,user){
        if(err) res.status(500).send(err);
        if(user.type!="chef") return res.redirect('/');
        else next();
    });
};

module.exports.isServer = function(req,res,next) {
    if(!req.signedCookies.userID){
        return res.redirect('/');
    }
    Employee.findOne({id: req.signedCookies.userID}, function(err,user){
        if(err) res.status(500).send(err);
        if(user.type!="server") return res.redirect('/');
        else next();
    });
};

module.exports.isCashier = function(req,res,next) {
    if(!req.signedCookies.userID){
        return res.redirect('/');
    }
    Employee.findOne({id: req.signedCookies.userID}, function(err,user){
        if(err) res.status(500).send(err);
        if(user.type!="cashier") return res.redirect('/');
        else next();
    });
};
