var express = require('express');
var router = express.Router();
var { Controller } = require('../controller/controller');

/* GET users listing. */
router.post('/', function(req, res, next) {
    Controller.select(`SELECT * FROM testblog_userTable where testblog_userName="${req.body.userName}"`,req,res);
});

module.exports = router;