var Sequelize = require('sequelize');
var Task = require('./task');
var safeCompare = require('safe-compare');

var sequelize = new Sequelize(process.env.DB_URL);

var User = sequelize.define('users', {
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notNull: true,
            notEmpty: true,
            len: [1, 20]
        }
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: true,
            notEmpty: true,
            len: [1, 20]
        }
    }
});

User.prototype.validPassword = function(password){
        return safeCompare(password, this.password);
}

User.hasMany(Task, {as: "tasks"});

sequelize.sync()
.catch(error => console.log('This error occurred', error));

module.exports = User;
