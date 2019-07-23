const { connection } = require('../db');
// 查
class Controller {
    select(selectName, req, res) {
        try {
            connection.query(selectName, function (err, results, fields) {
                if (err) throw err;
                if (results.length > 0) {
                    if (req.body.userName === results[0].testblog_userName) {
                        if (req.body.password === results[0].testblog_userPassword) {
                            res.json({
                                "code":1,
                                "msg":'登录成功！',
                                "userName":req.body.userName
                            });
                        } else {
                            res.json({
                                "code":2,
                                "msg":'密码错误!',
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
};


module.exports = {
    Controller: new Controller
}