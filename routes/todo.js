var express = require('express');
var router = express.Router();
var taskService = require('../service/taskService');
var sessionChecker = require('../service/session');


router.get('/', sessionChecker, function(req, res, next) {
    taskService.findByUserToComplete(req.session.user)
    .then((tasks) => {
        res.json(tasks);
    })
}); 


router.post('/', sessionChecker, (req, res) => {
        const newTask = req.body.task;
        taskService.createTask(newTask, req.session.user)
        .then((task) => {
            console.log(task);
            res.json(task);
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