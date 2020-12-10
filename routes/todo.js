var express = require('express');
var router = express.Router();
var sessionChecker = require('../session');
var createError = require('http-errors');
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    port: 33061,
    user: 'todo-user',
    password: 'todo-user',
    database: 'todo',
    multipleStatements: true
});

router.get('/', sessionChecker, function(req, res, next) {
    db.query(
        'SELECT * FROM tasks WHERE userId=' + req.session.user.id,
        (err, rows) => handleDBResult(res, next, rows, err));
});


router.post('/', sessionChecker, (req, res, next) => {
    db.query(
        'INSERT INTO tasks (userId, completed, task) VALUES ( ' + req.session.user.id + ', false, "' + req.body.task + '")',
        (err, _rows) => {
            if(err){
                next(createError(409));
            }else{
                res.redirect('/todo');
            }
        });
});

router.patch('/:taskId', sessionChecker, (req, res, next) => {
    db.query( "UPDATE tasks SET completed = true WHERE id = " + req.params.taskId,
    (err, rows) => handleDBResult(res, next, rows, err))
})

function handleDBResult(res, next, rows, err){
    if(err){
        next(createError(409));
    }else{
        res.json(rows);
    }
}

module.exports = router;
