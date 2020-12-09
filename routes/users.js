var express = require('express');
var router = express.Router();
var appRoot = require('app-root-path');
var path = require('path');
var createError = require('http-errors');
var sessionChecker = require('../session');


router.get('/signup', (_req, res) => {
	res.sendFile(appRoot + '/public/signup.html');
})

router.post('/signup/', (req, res, next) => {
	db.query("INSERT INTO users" +
	" (username, email, password)" + 
	" VALUES ('" + username + "','" + email + "','" + password + "')" , 
	(err, rows) => {
		if(err){
			next(createError(400));
		}else{
			req.session.user = user[0];
			res.redirect('/dashboard');
		} 
	})
});

router.get('/login', (_req, res) => {
	res.sendFile(path.join(appRoot.path, '/public/login.html'));
})

router.post('/login', (req, res, next) => {
	db.query(
		"SELECT * FROM users" +
		" WHERE username='" + req.body.username + "'", 
		(err, rows) => {
			if(err){
				next(createError(400));
			}else{
				if(rows.length === 0){			
					res.redirect('/users/login');
				}else if(req.body.password != user[0].password){
					res.redirect('/users/login');
				}else{
					req.session.user = user[0];
					res.redirect('/dashboard');
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
		res.redirect('/login');
	}
});

module.exports = router;
