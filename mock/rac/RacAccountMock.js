const moment = require('moment');
const Mock = require('mockjs');
const Random = Mock.Random;

const list = [
    {
        id: '1',
        signInName: 'admin',
        signInPswd: '52569c045dc348f12dfc4c85000ad832',
        signInNickname: '平台管理员',
        sign:
            'eyJhbGciOiJIUzUxMiJ9.eyJuYmYiOjE2MDc1ODk4MzAsImlzcyI6Inpib3NzIiwiZXhwIjoxNjA3NTg5ODMzLCJpYXQiOjE2MDc1ODk4MzAsInVzZXJJZCI6IjEifQ.NodxTh-rNCGwmkR1BhyebNl9Eeh0zV4v6KcaqBH6h2Kaqj4gKDMmVHstXCqsNKnLPKoOlcIYWW5BTVV94_wRRw',
    },
];

const listRacAccount = () => list;
const curAccountInfo = {
    result: 1,
    msg: '获取当前用户信息成功',
    extra: {
        id: list[0].id,
        nickname: list[0].signInNickname,
        isTester: false,
        menus: ['/base/rac-domain', '/base/rac-sys', '/base/rac-perm', '/base/rac-role', '/user/rac-org', '/user/rac-account'],
    },
};

const findRacAccountBySignInName = signInName => list.find(item => item.signInName === signInName);

module.exports = {
    findRacAccountBySignInName,
    listRacAccount,
    routes: {
        'GET /rac/account/list': listRacAccount,
        'GET /rac/account/get-cur-account-info': curAccountInfo,
    },
};
