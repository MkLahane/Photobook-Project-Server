const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require('../config');
module.exports = (user) => {
    return jwt.sign({
        id: user.id,
        username: user.username,
        email: user.email
    }, SECRET_KEY, { expiresIn: '1h' }); //the first arguement is the payload(the data that should be encoded with the token) 
    //and the second arguement is a secret key, and the options is the 3rd arguement
}