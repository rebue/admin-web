const moment = require('moment');
const { findRacAccountBySignInName } = require('./RacAccountMock');

const jwtTokenKey = process.env.VUE_APP_JWT_TOKEN_KEY;

const signIn = (req, res, u, b) => {
    const body = (b && b.body) || req.body;
    console.log('signIn', body);
    const account = findRacAccountBySignInName(body.accountName);

    if (!!!account) return res.json({ result: -2, msg: '找不到此账户' });

    if (body.signInPswd !== account.signInPswd) return res.json({ result: -2, msg: '密码输入错误' });

    res.cookie(jwtTokenKey, account.sign, { expires: new Date(Date.now() + 1800000) });

    return res.json({
        result: 1,
        msg: '账户登录成功',
        extra: {
            id: account.id,
        },
    });
};

module.exports = { routes: { 'POST /rac-svr/rac/sign-in/sign-in-by-account-name': signIn } };
