const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    port: 33061,
    user: 'todo-user',
    password: 'todo-user',
    database: 'todo'
});

module.exports = conn;