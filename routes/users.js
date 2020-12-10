var express = require('express');
var router = express.Router();
var appRoot = require('app-root-path');
var path = require('path');
var createError = require('http-errors');
var sessionChecker = require('../session');
const failedLoginReturnURL = '/users/login';
const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const db = mysql.createConnection({
	host: 'localhost',
	port: 33061,
	user: `${process.env.DB_USER}`,
	password: `${process.env.DB_PASSWORD}`,
	database: 'todo',
	multipleStatements: true
});


router.get('/signup', (_req, res) => {
	res.sendFile(appRoot + '/public/signup.html');
})

router.post('/signup/', (req, res, next) => {
	const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
	const dataRegex = /^[a-zA-Z0-9_]*$/;
	if(!emailRegexp.test(req.body.email) ||
	!dataRegex.test(req.body.username) ||
	!dataRegex.test(req.body.password)){
		next(createError(406));
	}
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
	const username = req.body.username.replace(/\W/g, '');
	db.query(
		"SELECT * FROM users" +
		" WHERE username='" + username + "'",
		(err, rows) => {
			if(err){
				next(createError(400));
			}else{
				if(rows.length === 0){
					res.redirect(failedLoginReturnURL);
				}else if(req.body.password !== rows[0].password){
					res.redirect(failedLoginReturnURL);
				}else{
					req.session.user = rows[0];
					res.redirect('/dashboard');
				}
			}
		}
	)
});

router.get('/change-pwd', sessionChecker, (req, res, next) => {
	const password = req.query.password.replace(/\W/g, '');
	db.query(
		"UPDATE users" +
		" SET password = '" + password+ "'" +
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
