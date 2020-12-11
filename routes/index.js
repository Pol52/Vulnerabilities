var express = require('express');
var router = express.Router();
var path = require('path');
var appRoot = require('app-root-path');
var sessionChecker = require('../service/session');

router.get('/', sessionChecker, function(req, res, next) {
  res.redirect('/dashboard');
});

router.get('/dashboard', (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
      res.sendFile(path.join(appRoot.path, '/public/dashboard.html'));
  } else {
      res.redirect('/users/login');
  }
});

module.exports = router;
