var express = require('express');
var router = express.Router();

router.get('/', (req, _res) => {
    console.log(req.query.c)
})


module.exports = router;
