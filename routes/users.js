var express = require('express');
var router = express.Router();
var appRoot = require('app-root-path');
var path = require('path');
var createError = require('http-errors');
var sessionChecker = require('../session');
const failedLoginReturnURL = '/users/login';
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    port: 33061,
    user: 'todo-user',
    password: 'todo-user',
    database: 'todo',
    multipleStatements: true
});


router.get('/signup', (_req, res) => {
	res.sendFile(appRoot + '/public/signup.html');
})

router.post('/signup/', (req, res, next) => {
	db.query("INSERT INTO users" +
	" (username, email, password)" +
	" VALUES ('" + req.body.username + "','" + req.body.email + "','" + req.body.password + "')" ,
	(err, _rows) => {
		if(err){
			next(createError(400));
		}else{
			res.redirect(failedLoginReturnURL);
		}
	})
});

router.get('/login', (_req, res) => {
	res.sendFile(path.join(appRoot.path, '/public/login.html'));
});

router.post('/login', (req, res, next) => {
	db.query(
		"SELECT * FROM users" +
		" WHERE username='" + req.body.username + "'",
		(err, rows) => {
			if(err){
				next(createError(400));
			}else{
				if(rows.length === 0){
					res.status(403).json({ error: "wrong credentials"});
				}else if(req.body.password !== rows[0].password){
					res.status(403).json({ error: "wrong credentials"});
				}else{
					req.session.user = rows[0];
					res.json(rows[0]);
				}
			}
		}
	)
});

router.get('/change-pwd', sessionChecker, (req, res, next) => {
	db.query(
		"UPDATE users" +
		" SET password = '" + req.query.password + "'" +
		" WHERE id = " + req.session.user.id,
		(err, rows, _fields) => {
			if(err){
				next(createError(400));
			}else{
				res.json(rows);
			}
		}
	);
});

router.get('/logout', (req, res) => {
	if (req.session.user && req.cookies.user_sid) {
		res.clearCookie('user_sid');
		res.redirect('/');
	} else {
		res.redirect(failedLoginReturnURL);
	}
});

module.exports = router;
