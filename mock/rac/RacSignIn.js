const moment = require('moment');
const Mock = require('mockjs');
const Random = Mock.Random;
const { findRacUserBySignInName } = require('./RacUser');

const signIn = (req, res, u, b) => {
    const body = (b && b.body) || req.body;
    console.log('signIn', body);
    const user = findRacUserBySignInName(body.userName);

    if (!!!user) return res.json({ result: -2, msg: '找不到此用户' });

    if (body.signInPswd !== user.signInPswd) return res.json({ result: -2, msg: '密码输入错误' });

    return res.json({
        result: 1,
        msg: '用户登录成功',
        extra: {
            id: user.id,
            sign: user.sign,
            expirationTime: moment().format('YYYY-MM-DD HH:mm:ss'),
            indexPath: 'index',
            nickname: Random.cname(),
        },
    });
};

module.exports = { routes: { 'POST /rac/sign-in/sign-in-by-user-name': signIn } };
