var db = require('../db/db');


var User = function(){}

User.findOne = function(username){
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT * FROM users" +
            " WHERE username='" + username + "'", 
            (err, rows, fields) => {
                if(err){
                    reject(err);
                }else{
                    resolve(rows);
                }
            })
    })
}

User.createUser = function(user){
    return new Promise((resolve, reject) => {
        db.query(
            "INSERT INTO users" +
            " (username, email, password, createdAt, updatedAt)" +
            " VALUES (" + user['username'] + "," + user['email'] + "," + user['password'] + ")", 
            (err, rows, fields) => {
                if(err){
                    reject(err);
                }else{
                    resolve(rows);
                }
            })
    })
}




module.exports = User;