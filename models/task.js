var db = require('../db/db');

var Task = function() {
    //empty task service
}

Task.findAll = function(userId){
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT * FROM tasks" +
            " WHERE completed = false" +
            " AND userId=" + userId, 
            (err, rows, fields) => {
                if(err){
                    reject(err);
                }else{
                    resolve(rows);
                }
            })
    }) 
}

Task.create = function(task, userId){
    return new Promise((resolve, reject) => {
        db.query(
            "INSERT INTO tasks" +
            " (userId, completed, task)" +
            " VALUES (" + userId + ", false,'" + task +"')", 
            (err, rows, fields) => {
                if(err){
                    reject(err);
                }else{
                    resolve(rows);
                }
            })
    })
}

Task.update = function(taskId){
    return new Promise((resolve, reject) => {
        db.query(
            "UPDATE tasks" +
            " SET completed = true" +
            " WHERE id = " + taskId, 
            (err, rows, fields) => {
                if(err){
                    reject(err);
                }else{
                    resolve(rows);
                }
            })
    })
}

module.exports = Task;