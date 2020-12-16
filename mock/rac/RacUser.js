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

const listRacUser = () => list;

const findRacUserBySignInName = signInName => list.find(item => item.signInName === signInName);

module.exports = {
    findRacUserBySignInName,
    listRacUser,
    routes: { 'GET /rac/user/list': listRacUser },
};
