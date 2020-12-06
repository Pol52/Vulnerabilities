var Sequelize = require('sequelize');
var Task = require('./task');

var sequelize = new Sequelize('mysql://todo-user:todo-user@localhost:33061/todo');

var User = sequelize.define('users', {
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

User.prototype.validPassword = function(password){
        return password === this.password;
}

User.hasMany(Task, {as: "tasks"});

sequelize.sync()
.then(() => console.log('users table has been successfully created, if one doesn\'t exist'))
.catch(error => console.log('This error occured', error));

module.exports = User;