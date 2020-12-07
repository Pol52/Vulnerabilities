var Task = require('../models/task');

var TaskService = function(){}

TaskService.findByUserToComplete = function(user){
    return Task.findAll(user.id);
}

TaskService.createTask = function(task, user){
    return Task.create(task, user.id);
}

TaskService.completeTask = function(taskId){
    return Task.update(taskId);
}

module.exports = TaskService;