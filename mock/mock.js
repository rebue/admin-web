const mock = {
    _proxy: require('./proxy'),
    ...require('./rac/RacUserMock').routes,
    ...require('./rac/RacSignInMock').routes,
    ...require('./rac/RacDomainMock').routes,
    ...require('./rac/RacSysMock').routes,
    ...require('./rac/RacMenuMock').routes,
};

// console.log('mock', mock);

module.exports = mock;
