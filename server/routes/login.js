var express = require('express');
var router = express.Router();
var { Controller } = require('../controller/login');

/* GET users listing. */
router.post('/', function(req, res, next) {
    Controller.select(`SELECT * FROM user_table where userName="${req.body.userName}"`,req,res);
});

module.exports = router;