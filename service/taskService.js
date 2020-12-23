var Task = require('../models/task');

var TaskService = function(){
    //empty task service
}

TaskService.findByUser = function(userId){
    return Task.findAll({
        where: {
            userId: userId
         }
     })
}

TaskService.findByUserToComplete = function(userId){
    return Task.findAll({
        where: {
            userId: userId,
            completed: false
         }
     })
}

TaskService.createTask = function(task, user){
    return Task.create({
        task: task,
        completed: false,
        userId: user.id
    })
}

TaskService.completeTask = function(taskId){
    return Task.update({
        completed: true,
    },
    {
        where:{
            id: taskId
        }
    })
}

module.exports = TaskService;
