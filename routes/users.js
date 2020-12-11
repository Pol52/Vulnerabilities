var express = require('express');
var router = express.Router();
var appRoot = require('app-root-path');
var userService = require('../service/userService');
var path = require('path');
const failedLoginFallbackURL = '/users/login';

router.get('/signup', (_req, res) => {
	res.sendFile(appRoot + '/public/signup.html');
});

router.post('/signup/', (req, res) => {
	userService.createUser(req)
	.then(user => {
		req.session.user = user.dataValues;
		res.redirect('/dashboard');
	})
	.catch(() => {
		res.redirect('/users/signup');
	});
});

router.get('/login', (_req, res) => {
	res.sendFile(path.join(appRoot.path, '/public/login.html'));
});

router.post('/login', (req,res) => {
	var username = req.body.username,
	password = req.body.password;

	userService.findOne(username)
	.then((user) => {
		if(!user){
			res.redirect(failedLoginFallbackURL);
		}else if(!user.validPassword(password)){
			res.redirect(failedLoginFallbackURL);
		}else{
			req.session.user = user.dataValues;
			res.redirect('/dashboard');
		}
	})
	.catch(() => {
		res.redirect(failedLoginFallbackURL);
	})
});

router.get('/logout', (req, res) => {
	if (req.session.user && req.cookies.user_sid) {
		res.clearCookie('user_sid');
		res.redirect('/');
	} else {
		res.redirect(failedLoginFallbackURL);
	}
});

module.exports = router;
