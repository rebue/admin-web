const mock = {
    _proxy: require('./proxy'),
    ...require('./rac/RacAccountMock').routes,
    ...require('./rac/RacSignInMock').routes,
    ...require('./rac/RacRealmMock').routes,
    ...require('./rac/RacAppMock').routes,
    ...require('./rac/RacRoleMock').routes,
    ...require('./rac/RacPermGroupMock').routes,
    ...require('./rac/RacPermMock').routes,
    ...require('./rac/RacOrgMock').routes,
    ...require('./rac/RacOpLogMock').routes,
    ...require('./rac/RacLockLogMock').routes,
    ...require('./rac/RacVerifitionMock').routes,
    ...require('./rac/RacUserMock').routes,
    ...require('./rac/OapAppMock').routes,
    ...require('./rac/OapOidcMock').routes,
    ...require('./rac/RacDicMock').routes,
    ...require('./rac/OrpConfigMock').routes,
    ...require('./rac/EtlStrategyMock').routes,
};

// console.log('mock', mock);

module.exports = mock;
