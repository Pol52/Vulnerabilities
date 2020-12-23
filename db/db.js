const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    port: 33061,
    user: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASSWORD}`,
    database: 'todo',
    multipleStatements: true
});

module.exports = conn;

