var sessionChecker = (req, res, next) => {
	if (req.session.user && req.cookies.user_sid){
		next();
	} else {
		res.redirect('/users/login');
	}
};

module.exports = sessionChecker;
