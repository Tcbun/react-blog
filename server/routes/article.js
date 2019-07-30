var express = require('express');
var router = express.Router();
const { agree, saliva, getComment,submitComment } = require('../controller/article');

router.post('/', function (req, res, next) {
    console.log(req.body);
    // saliva(req.body.id,req,res);
    switch (req.body.type) {
        case "agree":
            agree(req, res);
            break;
        case "saliva":
            saliva(req, res);
            break;
        case "getComment":
            getComment(req, res);
            break;
        case "submitComment":
            submitComment(req, res);
            break;
        default:
    };
});

module.exports = router;

