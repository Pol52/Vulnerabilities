var express = require('express');
var router = express.Router();
var taskService = require('../service/taskService');
var sessionChecker = require('../service/session');

router.get('/', sessionChecker, function(req, res, next) {
    taskService.findByUserToComplete(req.query.id)
    .then((tasks) => {
        res.json(tasks);
    })
});

router.post('/', sessionChecker, (req, res) => {
        const newTask = req.body.task;
        taskService.createTask(newTask, req.session.user)
        .then(() => {
            res.redirect('/todo?id=' + req.session.user.id);
        })
        .catch((err) => {
            console.log(err);
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
