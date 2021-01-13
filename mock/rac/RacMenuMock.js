const Mock = require('mockjs');

const list = [
    {
        id: '1536131597108',
        sysId: 'platform-admin-web',
        code: '00',
        title: null,
        name: '基础配置',
        path: 'base',
        isEnabled: true,
        icon: 'setting',
        remark: '系统相关业务',
    },
    {
        id: '1536131597109',
        sysId: 'platform-admin-web',
        code: '0000',
        title: '领域',
        name: '领域',
        path: 'domain',
        isEnabled: true,
        icon: null,
        remark: '领域相关业务',
    },
    {
        id: '1536131597109',
        sysId: 'platform-admin-web',
        code: '0001',
        title: '系统',
        name: '系统',
        path: 'sys',
        isEnabled: true,
        icon: null,
        remark: '系统相关业务',
    },
    {
        id: '1536131597110',
        sysId: 'platform-admin-web',
        code: '0002',
        title: '菜单',
        name: '菜单',
        path: 'menu',
        isEnabled: true,
        icon: null,
        remark: '菜单相关业务',
    },
    {
        id: '1536131597111',
        sysId: 'platform-admin-web',
        code: '0003',
        title: '功能',
        name: '功能',
        path: 'func',
        isEnabled: true,
        icon: null,
        remark: '功能相关业务',
    },
    {
        id: '1536131597112',
        sysId: 'platform-admin-web',
        code: '0004',
        title: '角色',
        name: '角色',
        path: 'role',
        isEnabled: true,
        icon: null,
        remark: '角色相关业务',
    },
    {
        id: '1536131597113',
        sysId: 'platform-admin-web',
        code: '0005',
        title: null,
        name: '脚本',
        path: 'script',
        isEnabled: true,
        icon: null,
        remark: '脚本相关业务',
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
