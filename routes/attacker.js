var express = require('express');
var router = express.Router();
var appRoot = require('app-root-path');

router.get('/', (req, res) => { 
    console.log(req.query.c)
})


module.exports = router;