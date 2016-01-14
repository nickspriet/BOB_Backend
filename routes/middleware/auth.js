/**
 * routes/middleware/auth.js:
 * Authenticate the user (middleware)
 */
'use strict';
var facebookApi = require('../api/facebookApi');
var User = require('../../data/models/User');
var UsersRepo = require('../../data/repositories/UsersRepo');
var UserTokensRepo = require('../../data/repositories/UserTokensRepo');
var showError = require('../error');
var _ = require('lodash');
var crypto = require('crypto');

function getParams(req) {
    return _.mapKeys(_.merge(req.query, req.body, req.params),
        function (value, key) {
            return key.substr('com.howest.nmct.bob.'.length);
        }
    );
}

var Auth = (function () {
    /**
     * Check if the user is already authenticated
     * Then create a new User or return the existing User
     * @param {String} facebookID Authenticated user's id to check
     * @param {String} facebookToken The accessToken from Facebook
     * @param {Function} cb Callback(Error err, User user)
     */
    var findOrCreateUser = function (req, res, next) {
        var params = req.params = getParams(req);

        UsersRepo.getByFacebookUserId(params.FACEBOOK_USERID, function (err, profile) {
            if (err) {
                return showError.response(res)(err, err.message);
            }

            if (profile) {
                // There is already a profile, return this
                console.info('Profile exists', profile.name);
                req.user = profile;
                next();
            }
            else {
                // No user, so make one
                console.info('Creating new user');
                facebookApi(params.FACEBOOK_TOKEN).getProfile(function (err, profile) {
                    if (err) {
                        return showError.response(res)(err, err.message);
                    }

                    console.info('New profile', profile.name);

                    var user = req.user = User.createFromFacebook(profile);
                    user.save(next);
                });
            }
        });
    };


    /**
     * Creates a new token for the user and device
     * @param {User} user The user for whom to create a token for
     * @param {String} facebookToken The accessToken from Facebook
     * @param {String} facebookExpirationString Expiration date as a String
     * @param {String} deviceType The device type "android" for now
     * @param {String} deviceModel The identifier of the device
     * @param {Function} cb Callback(Error err, String userToken)
     */
    var createToken = function (req, res, next) {
        UserTokensRepo.renew(req.user, req.params.FACEBOOK_TOKEN, req.params.FACEBOOK_EXPIRES, req.params.DEVICE_TYPE, req.params.DEVICE_MODEL, function (err, userToken) {
            crypto.randomBytes(48, function (ex, buf) {
                // make the string url safe
                var token = buf.toString('base64').replace(/\//g, '_').replace(/\+/g, '-');

                // embed the userId in the token, and shorten it
                userToken.token = userToken.userId + '|' + token.toString().slice(1, 24);
                userToken.save(function (err) {
                    if (err) {
                        return next(err);
                    }

                    req.userToken = userToken.token;
                    next();
                });
            });
        });
    };

    return {
        findOrCreateUser: findOrCreateUser,
        createToken: createToken
    };
}());

module.exports = Auth;