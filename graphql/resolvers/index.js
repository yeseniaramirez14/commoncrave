const userResolver = require('./user');
const groupResolver = require('./group');

const rootResolver = {
    ...userResolver,
    ...groupResolver
};

module.exports = rootResolver;