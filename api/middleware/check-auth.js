

'use strict';
const JWT = require('./jwt');
const IsAuthenticated = (req, res, next) => {
    let verified = JWT.verifyToken(req.headers.authorization);
    req.userData = verified;
    next();
};
module.exports = IsAuthenticated;