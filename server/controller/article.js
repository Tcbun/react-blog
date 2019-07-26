const { connection } = require('../db');

const agree = (selectParam, req, res) => {
    connection.query(`UPDATE article_table SET star=star+1 WHERE id=${selectParam}`, function (err, results, fields) {
        res.json({
            "code": 5,
            "msg": "点赞成功！"
        })
    })
}

const saliva = (selectParam, req, res) => {
    connection.query(`UPDATE article_table SET saliva=saliva+1 WHERE id=${selectParam}`, function (err, results, fields) {
        res.json({
            "code": 6,
            "msg": "踩成功！"
        })
    })
}

module.exports = {
    agree,
    saliva
}