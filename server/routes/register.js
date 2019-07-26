var express = require('express');
var router = express.Router();
var { Controller } = require('../controller/login');

/* GET users listing. */
router.post('/', function(req, res, next) {
    Controller.insert(
        `SELECT * FROM user_table where userName="${req.body.userName}"`,
        `INSERT INTO user_table(id,userName,password,remeber) VALUES(0,"${req.body.userName}","${req.body.password}",true)`,
        req,res);
});

module.exports = router;