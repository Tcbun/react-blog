const { connection } = require('../db');
// 查
class Controller {
    select(selectName, req, res) {
        try {
            connection.query(selectName, function (err, results, fields) {
                if (err) throw err;
                if (results.length > 0) {
                    if (req.body.userName === results[0].userName) {
                        if (req.body.password === results[0].password) {
                            res.json({
                                "code": 1,
                                "msg": '登录成功！',
                                "userName": req.body.userName
                            });
                        } else {
                            res.json({
                                "code": 2,
                                "msg": '密码错误!',
                            });
                        };
                    };
                } else {
                    res.json({
                        "code": 0,
                        "msg": '用户不存在！'
                    });
                };
            });
            // console.log(req.body);
        } catch (e) {
            console.log('数据库查询出错！');
        };
    };
    insert(selectName,addSqlParams,req, res) {
        try {
            connection.query(selectName,addSqlParams,function (err, results, fields) {
                if (err) throw err;
                // console.log(results);
                // console.log(req.body.userName);
                // console.log(req.body.password);
                if (results.length > 0) {
                    res.json({
                        code: 3,
                        "msg": '用户已注册！'
                    });
                } else if (results.length === 0) {
                    connection.query(addSqlParams,function(err,results,fields){
                        if (err) throw err;
                        res.json({
                            code:4,
                            "msg":'注册成功！',
                            userName:req.body.userName
                        })
                    });
                }
            });
        } catch (e) {
            console.log('数据库添加出错！');
        };
    };
};


module.exports = {
    Controller: new Controller
}