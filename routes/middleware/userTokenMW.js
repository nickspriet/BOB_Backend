/**
 * routes/middleware/userTokenMW.js:
 * Get the usertoken for the authenticated user (middleware)
 */
var UserTokensRepo = require('../../data/repositories/UserTokensRepo');
var showError = require('../error');


var loadUserToken = function (req, res, next) {
    'use strict';
    switch (req.method) {
        case 'GET':
        case 'PUT':
            UserTokensRepo.getByFacebookToken(req.query.token, function (err, userToken) {
                if (err || !userToken) {
                    return showError.response(res)(err, err.message);
                }

                req.userToken = userToken;
                next();
            });
            break;

        case 'POST':
            UserTokensRepo.getByFacebookToken(req.body.token, function (err, userToken) {
                if (err || !userToken) {
                    return showError.response(res)(err, err.message);
                }

                req.userToken = userToken;
                next();
            });
            break;

        default:
            showError.response(res)(new Error('Bad Method'), 'No method ' + req.method);
    }

};

module.exports.loadUserToken = loadUserToken;
