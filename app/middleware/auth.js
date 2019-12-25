const jwt = require('express-jwt');
const config = require('../../config');

const auth = jwt({ secret: config.jwtSecret});
module.exports = auth;