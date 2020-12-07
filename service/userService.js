var User = require('../models/user');

var UserService = function(){}

UserService.findOne = function(username){
    return User.findOne(username);
}

UserService.createUser = function(req){
    return User.create(req.body.username,
         req.body.email,
         req.body.password);
}


module.exports = UserService;