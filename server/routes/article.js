var express = require('express');
var router = express.Router();
const { agree, saliva } = require('../controller/article');

router.post('/', function (req, res, next) {
    console.log(req.body);
    // saliva(req.body.id,req,res);
    switch (req.body.type) {
        case "agree":
            agree(req.body.id, req, res);
            break;
        case "saliva":
            saliva(req.body.id, req, res);
    };
});

module.exports = router;

