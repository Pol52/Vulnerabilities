var db = require('../db/db');

var User = function(){
    //empty User repository
}

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
        var query = "INSERT INTO users" +
        " (username, email, password)" + 
        " VALUES ('" + username + "','" + email + "','" + password + "')";
        db.query(query ,
            (err, rows, _fields) => {
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
