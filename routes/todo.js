var express = require('express');
var router = express.Router();
var sessionChecker = require('../session');
var createError = require('http-errors');
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    port: 33061,
    user: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASSWORD}`,
    database: 'todo',
    multipleStatements: true
});

router.get('/', sessionChecker, function(req, res, next) {
    db.query(
        'SELECT * FROM tasks WHERE userId=' + req.session.user.id,
        (err, rows) => handleDBResult(res, next, rows, err));
});


router.post('/', sessionChecker, (req, res, next) => {
    const task = req.body.task.replace(/\W/g, '');
    db.query(
        'INSERT INTO tasks (userId, completed, task) VALUES ( ' + req.session.user.id + ', false, "' + task + '")',
        (err, _rows) => {
            if(err){
                next(createError(409));
            }else{
                res.redirect('/todo');
            }
        });
});

router.patch('/:taskId', sessionChecker, (req, res, next) => {
    const idRegex = /^\d+$/;
    if(idRegex.test(req.body.params.taskId)){
        db.query( "UPDATE tasks SET completed = true WHERE id = " + req.params.taskId,
        (err, rows) => handleDBResult(res, next, rows, err))
    }else{
        next(createError(409));
    }
});

function handleDBResult(res, next, rows, err){
    if(err){
        next(createError(409));
    }else{
        res.json(rows);
    }
}

module.exports = router;
