var express = require('express');
var router = express.Router();
var appRoot = require('app-root-path');
var path = require('path');
var createError = require('http-errors');
var sessionChecker = require('../session');
const failedLoginReturnURL = '/users/login';
const mysql = require('mysql');
const {body, query ,validationResult} = require('express-validator');
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

router.post('/signup/', [
	body('email').isEmail(),
	body('username').matches(/^[a-zA-Z0-9_]*$/).isLength({min: 1, max: 20}),
	body('password').matches(/^[a-zA-Z0-9_]*$/).isLength({min: 1, max: 20})
],(req, res, next) => {
	const errors = validationResult(req);
	if(!errors.isEmpty()){
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

router.post('/login', [
	body('username').matches(/^[a-zA-Z0-9_]*$/).isLength({min: 1, max: 20})
],
(req, res, next) => {
	const errors = validationResult(req);
	if(!errors.isEmpty()){
		next(createError(400));
	}else{
		db.query(
			"SELECT * FROM users" +
			" WHERE username='" + req.body.username + "'",
			(err, rows) => {
				if(err){
					console.log(err);
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
	}
});

router.post('/change-pwd', [
	sessionChecker,
	body('password').matches(/^[a-zA-Z0-9_]*$/).isLength({min: 1, max: 20})
], (req, res, next) => {
	const errors = validationResult(req);
	if(!errors.isEmpty()){
		next(createError(400));
	}else{
		db.query(
			"UPDATE users" +
			" SET password = '" + req.body.password+ "'" +
			" WHERE id = " + req.session.user.id,
			(err, rows, _fields) => {
				if(err){
					next(createError(400));
				}else{
					res.json(rows);
				}
			}
		);
	}
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
