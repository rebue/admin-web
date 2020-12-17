const Mock = require('mockjs');

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

const listRacMenu = (req, res) => {
    console.log('listRacMenu');
    return res.json({
        result: 1,
        msg: '查询菜单列表成功',
        extra: {
            list,
        },
    });
};

const listOwnRacMenu = (req, res) => {
    console.log('listOwnRacMenu');
    return res.json({
        result: 1,
        msg: '查询自己的菜单列表成功',
        extra: {
            list,
        },
    });
};

module.exports = {
    listRacMenu,
    listOwnRacMenu,
    routes: { 'GET /rac/menu/list': listRacMenu },
    routes: { 'GET /rac/menu/list-own': listOwnRacMenu },
};
