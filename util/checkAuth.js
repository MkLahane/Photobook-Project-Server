const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server');
const { SECRET_KEY } = require('../config');

module.exports = (context) => {
    // context = {....., headers}
    const authHeader = context.req.headers.authorization;
    if (authHeader) {
        //we need to get the token, and it is stored as Bearer <token>
        const token = authHeader.split('Bearer ')[1];
        if (token) {
            try {
                const user = jwt.verify(token, SECRET_KEY);
                return user;
            } catch (err) {
                throw new AuthenticationError('Invalid/Expired token');
            }
        }
        throw new AuthenticationError('Token not found in Bearer <token> format');
    }
    throw new AuthenticationError('Authorization Header not found');
};