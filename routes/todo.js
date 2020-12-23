var express = require('express');
var router = express.Router();
var taskService = require('../service/taskService');
var sessionChecker = require('../service/session');
var createError = require('http-errors');

router.get('/', sessionChecker, function(req, res, next) {
    taskService.findByUserToComplete(req.session.user.id)
    .then((tasks) => {
        res.json(tasks);
    })
});

router.post('/', sessionChecker, (req, res, next) => {
    const newTask = req.body.task;
    taskService.createTask(newTask, req.session.user)
    .then(() => {
        res.redirect('/todo');
    })
    .catch(() => {
        next(createError(400));
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
