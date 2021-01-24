const registerResolver = require('./mutations/register');
const loginResolver = require('./mutations/login');
const confirmResolver = require('./mutations/confirm')

module.exports = {
    Mutation: {
        ...registerResolver.Mutation,
        ...loginResolver.Mutation,
        ...confirmResolver.Mutation
    }
};