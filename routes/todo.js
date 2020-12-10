var express = require('express');
var router = express.Router();
var sessionChecker = require('../session');
var createError = require('http-errors');
var db = require('../db/db');
 
router.get('/', sessionChecker, function(req, res, next) {
    db.query(
        "SELECT * FROM tasks" +
        " WHERE completed = false" +
        " AND userId=" + req.session.user.id, 
        (err, rows, _fields) => {
            if(err){
                next(createError(409));
            }else{
                res.json(rows); 
            }
        } 
    )
}); 


router.post('/', sessionChecker, (req, res, next) => {
    db.query(
        "INSERT INTO tasks" +
        " (userId, completed, task)" +
        " VALUES (" + req.session.user.id + ", false,'" + req.body.task +"')", 
        (err, _rows, _fields) => {
            if(err){
                next(createError(409));
            }else{
                res.redirect('/todo');
            }
        })
});

router.patch('/:taskId', sessionChecker, (req, res, next) => {
    db.query(
        "UPDATE tasks" +
        " SET completed = true" +
        " WHERE id = " + req.params.taskId, 
        (err, rows, _fields) => {
            if(err){
                next(createError(409));
            }else{
                res.json(rows);
            }
        })
})

module.exports = router;