var Sequelize = require('sequelize');
var User = require('./user');
var sequelize = new Sequelize(process.env.DB_URL);

var Task = sequelize.define('tasks', {
    task: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: false,
        validate: {
            notNull: true,
            is: /^[a-zA-Z0-9_]*$/,
            len: [1, 1000]
        }
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
.catch(error => console.log('This error occurred', error));

module.exports = Task;
