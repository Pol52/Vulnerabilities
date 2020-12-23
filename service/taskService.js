var Task = require('../models/task');

var TaskService = function(){
    //empty task service
}

TaskService.findByUserToComplete = function(userId){
    return Task.findAll(userId);
}

TaskService.createTask = function(task, user){
    return Task.create(task, user.id);
} 

TaskService.completeTask = function(taskId){
    return Task.update(taskId);
}
 
module.exports = TaskService;