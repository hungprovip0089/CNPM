var Employee = require('../model/employee.model.js');

module.exports.login = function(req, res){
    const username = req.body.username;
    const pwd = req.body.pwd;
    Employee.findOne({username: username, pwd: pwd}, function(err, user){
        if(!user){
            console.log("Your username or password is not true");
            return;
        }
        res.cookie('userID',user.id,{
            signed: true
        });
        if(user.type=="manager") res.redirect('/manager');
        if(user.type=="server") res.redirect('/server');
        if(user.type=="chef") res.redirect('/chef');
        if(user.type=="cashier") res.redirect('/cashier');
    })
}