var express = require('express');
var router = express.Router();
var appRoot = require('app-root-path');
var userService = require('../service/userService');
var path = require('path');
const failedLoginFallbackURL = '/users/login';
var sessionChecker = require('../service/session');

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
			res.status(403).json({ error: "wrong credentials"});
		}else if(!user.validPassword(password)){
			res.status(403).json({ error: "wrong credentials"});
		}else{
			req.session.user = user.dataValues;
			res.json(user.dataValues);
		}
	})
	.catch(() => {
		res.redirect(failedLoginFallbackURL);
	})
});

router.post('/change-pwd', sessionChecker, (req, res) => {
	const password = req.body.password;
	const userId = req.session.user.id;
	userService.changePassword(userId, password)
	.then((result) => {
		res.json(result);
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
