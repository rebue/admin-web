const mock = {
    _proxy: require('./proxy'),
    ...require('./rac/RacAccountMock').routes,
    ...require('./rac/RacSignInMock').routes,
    ...require('./rac/RacRealmMock').routes,
    ...require('./rac/RacSysMock').routes,
    ...require('./rac/RacRoleMock').routes,
    ...require('./rac/RacPermGroupMock').routes,
    ...require('./rac/RacPermMock').routes,
    ...require('./rac/RacOrgMock').routes,
    ...require('./rac/RacOpLogMock').routes,
    ...require('./rac/RacLockLogMock').routes,
};

// console.log('mock', mock);

module.exports = mock;
