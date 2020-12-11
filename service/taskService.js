var Task = require('../models/task');

var TaskService = function(){
    //empty task service
}

TaskService.findByUser = function(user){
    return Task.findAll({
        where: {
            userId: user.id
         }
     })
}

TaskService.findByUserToComplete = function(user){
    return Task.findAll({ 
        where: { 
            userId: user.id,
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
