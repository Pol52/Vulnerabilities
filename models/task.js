var Sequelize = require('sequelize');
var User = require('./user');
var sequelize = new Sequelize('mysql://todo-user:todo-user@localhost:33061/todo');

var Task = sequelize.define('tasks', {
    task: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: false
    },
    completed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    userId: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: "id"
        }
    }
});


sequelize.sync()
.then(() => console.log('task table has been successfully created, if one doesn\'t exist'))
.catch(error => console.log('This error occured', error));

module.exports = Task;