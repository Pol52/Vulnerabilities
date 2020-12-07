var express = require('express');
var router = express.Router();
var appRoot = require('app-root-path');
var userService = require('../service/userService');
var path = require('path');
var sessionChecker = require('../service/session');


router.get('/signup', (req, res) => {
	res.sendFile(appRoot + '/public/signup.html');
})
router.post('/signup/', (req, res) => {
	userService.createUser(req)
	.then(user => {
		req.session.user = user.dataValues;
		res.redirect('/dashboard');
	})
	.catch(error => {
		res.redirect('/users/signup');
	});
});

router.get('/login', (req, res) => {
	res.sendFile(path.join(appRoot.path, '/public/login.html'));
})
router.post('/login', (req,res) => {
	var username = req.body.username,
	password = req.body.password;

	userService.findOne(username)
	.then((user) => {
		if(!user){			
			res.redirect('/users/login');
		}else if(password != user[0].password){
			res.redirect('/users/login');
		}else{
			req.session.user = user[0];
			res.redirect('/dashboard');
		}
	})		
});

router.get('/change-pwd', sessionChecker, (req, res) => {
	const password = req.query.password;
	const userId = req.session.user.id;
	userService.changePassword(userId, password)
	.then((result) => {
		res.json(result);
	})

} )

router.get('/logout', (req, res) => {
	if (req.session.user && req.cookies.user_sid) {
		res.clearCookie('user_sid');
		res.redirect('/');
	} else {
		res.redirect('/login');
	}
});

module.exports = router;
