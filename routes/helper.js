var config = require('../config');

/**
 * Checks for an authorization header and validates the ID and secret.
 */
exports.isAPIAuthenticated = function (req, res, next) {
    var auth = req.headers.authorization;
    if (!auth) {
        res.status(401);
        return res.send({
            message: 'HTTP 401 Unauthorized',
            statusCode: 401
        });
    }

    var buf = new Buffer(auth.split(' ')[1], 'base64').toString('utf8').split(':');
    var id = buf[0];
    var secret = buf[1];

    // @TODO: Dynamic API keys
    if (config.api.clientID === id && config.api.clientSecret === secret) {
        next();
    } else {
        res.status(401);
        return res.send({
            message: 'HTTP 401 Unauthorized',
            statusCode: 401
        });
    }
};
