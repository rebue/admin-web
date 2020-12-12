const moment = require('moment');
const Mock = require('mockjs');
const Random = Mock.Random;

const signInResults = [
    {
        result: 1,
        msg: '用户登录成功',
        extra: {
            id: '1',
            sign:
                'eyJhbGciOiJIUzUxMiJ9.eyJuYmYiOjE2MDc1ODk4MzAsImlzcyI6Inpib3NzIiwiZXhwIjoxNjA3NTg5ODMzLCJpYXQiOjE2MDc1ODk4MzAsInVzZXJJZCI6IjEifQ.NodxTh-rNCGwmkR1BhyebNl9Eeh0zV4v6KcaqBH6h2Kaqj4gKDMmVHstXCqsNKnLPKoOlcIYWW5BTVV94_wRRw',
            expirationTime: moment().format('YYYY-MM-DD HH:mm:ss'),
            indexPath: 'index',
            nickname: Random.cname(),
        },
    },
    { result: -3, msg: '密码错误，还可以重试4次' },
    { result: -3, msg: '用户已被锁定，请明天再试' },
];

module.exports = {
    'POST /rac/sign-in/sign-in-by-user-name': signInResults[0],
};
