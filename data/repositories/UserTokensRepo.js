/**
 * repositories/UserTokensRepo.js:
 * Data accessor for UserTokens
 */

var UserTokensRepo = (function () {
    'use strict';
    var UserToken = require('../models/UserToken');

    /**
     * Remove old facebookToken and create a new one
     * @param {User} user The user for whom to create a token for
     * @param {String} facebookToken The accessToken from Facebook
     * @param {String} facebookExpirationString Expiration date as a String
     * @param {String} deviceType The device type "android" for now
     * @param {String} deviceModel The identifier of the device
     * @param {Function} next Callback(Error err, String userToken)
     */
    var renew = function (user, facebookToken, facebookExpirationString, deviceType, deviceModel, next) {
        UserToken.remove({
            deviceType: deviceType,
            deviceModel: deviceModel,
            userId: user._id
        }, function () {
            // Create a token for the newly connected device
            var userToken = new UserToken({
                userId: user._id,
                facebookToken: facebookToken,
                facebookExpirationDate: new Date(facebookExpirationString),
                deviceType: deviceType,
                deviceModel: deviceModel
            });

            next(null, userToken);
        });
    };

    /**
     * Get the facebook token for the authenticated user
     * @param {String} token The user for whom to create a token for
     */
    var getByFacebookToken = function (token, next) {
        UserToken.findOne({'token': token}, function (err, userToken) {
            if (err) return next(err);
            if (!userToken) return next(new Error('Invalid token: no user found for this token'));
            next(null, userToken);
        });
    };

    return {
        model: UserToken,
        renew: renew,
        getByFacebookToken: getByFacebookToken
    };
}());

module.exports = UserTokensRepo;
