const { connection } = require('../db');

const agree = (req, res) => {
    connection.query(`UPDATE article_table SET star=star+1 WHERE id=${req.body.id}`, function (err, results, fields) {
        if (err) throw err;
        res.json({
            "code": 5,
            "msg": "点赞成功！"
        })
    })
}

const saliva = (req, res) => {
    connection.query(`UPDATE article_table SET saliva=saliva+1 WHERE id=${req.body.id}`, function (err, results, fields) {
        if (err) throw err;
        res.json({
            "code": 6,
            "msg": "踩成功！"
        })
    })
}

const getComment = (req, res) => {
    connection.query(`SELECT id,article_id,comment,asker,date FROM comment_table WHERE article_id=${req.body.id}`, function (err, results, fields) {
        res.json(results);
    })
}

const submitComment = (req, res) => {
    connection.query(`INSERT INTO comment_table(id,article_id,comment,asker,date) VALUES(0,${req.body.article_id},"${req.body.comment}","${req.body.asker}","${req.body.date}")`, function (err, results, fields) {
        if (err) throw err;
        connection.query(`UPDATE article_table SET comment=comment+1 WHERE article_table.id=${req.body.article_id}`)
        res.json({
            "code": 7,
            "msg": "评论成功！",
            results
        })
    })
}

module.exports = {
    agree,
    saliva,
    getComment,
    submitComment
}