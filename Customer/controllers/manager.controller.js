var utility = require("../controllers/utility.js");
var Server = require("../model/server.model.js");

module.exports.manageServer = function(req, res){
    Server.find().then(function(servers){
        res.render('manager/managerServer',{
            servers : servers
        })
    })
};


// module.exports.createFood = function(req,res){
//     const newFood = req.body;
//     let id = await utility.Food.createFood(newFood);
//     if(id<0){
//         console.log('Create food FAILED');
//     }
//     else{
//         console.log('Create food SUCCESSFUL');
//     }
// };
module.exports.createServer = async function(req, res){
    const newServer = req.body;
    let id = await utility.Server.createServer(newServer);
    if(id<0){
        console.log('Create server FAILED');
    }
    else{
        console.log('Create server SUCCESSFUL');
    }
    res.redirect('/manager/manageServer');
}