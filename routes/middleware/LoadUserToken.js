/**
 * Created by Nick on 12/31/15.
 */
var UserTokensRepo = require('../../data/repositories/UserTokensRepo');
var showError = require('../error');

function loadUserToken(req, res, next) {
    UserTokensRepo.getByFacebookToken(req.query.token, function (err, userToken) {
        if (err || !userToken) return showError.response(res)(err, err.message);

        req.userToken = userToken;
        next();
    });
}

module.exports = loadUserToken;