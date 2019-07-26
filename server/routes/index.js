var express = require('express');
var router = express.Router();
const { select } = require('../controller');

/* GET home page. */
router.get('/', function (req, res, next) {
  select('article_table',req,res);
});

module.exports = router;
