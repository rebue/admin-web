const mock = {
    _proxy: require('./proxy'),
    ...require('./rac/RacUser').routes,
    ...require('./rac/RacSignIn').routes,
};

// console.log('mock', mock);

module.exports = mock;
