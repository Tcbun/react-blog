const { connection } = require('../db');

const select = (selectSql, req, res) => {
    try {
        connection.query(`SELECT id,title,content,star,saliva,comment,date,author FROM article_table`, function (err, results, fields) {
            console.log(results);
            res.json(results);
        })
    } catch (e) {
        console.log('查询错误！')
    }
}

module.exports = {
    select
}