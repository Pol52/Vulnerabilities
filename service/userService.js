var User = require('../models/user');

var UserService = function(){
    //empty user service
};

UserService.findOne = function(username){
    return User.findOne({ where: { username: username } })
}

UserService.createUser = function(req){
    return User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
}

module.exports = UserService;
