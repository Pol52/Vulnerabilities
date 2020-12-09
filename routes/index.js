var express = require('express');
var router = express.Router();
var path = require('path');
var appRoot = require('app-root-path');
var sessionChecker = require('../session');


router.get('/', sessionChecker, function(req, res, next) {
  res.redirect('/dashboard');
}); 

router.get('/dashboard', sessionChecker, (req, res) => {
      res.sendFile(path.join(appRoot.path, '/public/dashboard.html'));
});
 
module.exports = router;
