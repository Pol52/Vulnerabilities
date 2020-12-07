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

User.create = function(username, email, password){  
    return new Promise((resolve, reject) => {
        db.query(
            "INSERT INTO users" +
            " (username, email, password)" +
            " VALUES ('" + username + "','" + email + "','" + password + "')", 
            (err, rows, fields) => {
                if(err){
                    reject(err);
                }else{
                    resolve(rows);
                }
            })
    })
}

User.update = function(userId, password){
    return new Promise((resolve, reject) => {
        db.query(
            "UPDATE users" +
            " SET password = '" + password + "'" +
            " WHERE id = " + userId,
            (err, rows, fields) => {
                if(err){
                    reject(err);
                }else{
                    resolve(rows);
                }
            }
        )
    })
}




module.exports = User;