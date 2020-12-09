var express = require('express');
var router = express.Router();
var taskService = require('../service/taskService');
var sessionChecker = require('../service/session');
var db = require('../db/db');

router.get('/', sessionChecker, function(req, res, next) {
    taskService.findByUserToComplete(req.session.user)
    .then((tasks) => {
        res.json(tasks);
    })
}); 


router.post('/', sessionChecker, (req, res) => {
    db.query(
        "INSERT INTO tasks" +
        " (userId, completed, task)" +
        " VALUES (" + req.session.user.id + ", false,'" + req.body.task +"')", 
        (err, rows, fields) => {
            if(err){
                console.log(err);
            }else{
                res.redirect('/todo');
            }
        })
});

router.patch('/:taskId', sessionChecker, (req, res) => {
    const taskId = req.params.taskId;
    taskService.completeTask(taskId)
    .then((result) => {
        res.json(result);
    })
})

module.exports = router;