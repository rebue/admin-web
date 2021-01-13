const moment = require('moment');
const { findRacUserBySignInName } = require('./RacUserMock');

const jwtTokenKey = process.env.VUE_APP_JWT_TOKEN_KEY;

const signIn = (req, res, u, b) => {
    const body = (b && b.body) || req.body;
    console.log('signIn', body);
    const user = findRacUserBySignInName(body.userName);

    if (!!!user) return res.json({ result: -2, msg: '找不到此用户' });

    if (body.signInPswd !== user.signInPswd) return res.json({ result: -2, msg: '密码输入错误' });

    res.cookie(jwtTokenKey, user.sign, { expires: new Date(Date.now() + 1800000) });

    return res.json({
        result: 1,
        msg: '用户登录成功',
        extra: {
            id: user.id,
            indexUrn: '/',
        },
    });
};

module.exports = { routes: { 'POST /rac/sign-in/sign-in-by-user-name': signIn } };
