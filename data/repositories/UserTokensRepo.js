/**
 * Created by Nick on 12/30/15.
 */

var UserTokensRepo = (function () {
    var UserToken = require('../models/UserToken');

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

    var getByFacebookToken = function (token, next) {
        UserToken.findOne({'token': token}, function (err, userToken) {
            if (err) return next(err);
            if (!userToken) return next(new Error('Invalid token: no user found for this token'));

            console.log('userToken', userToken);
            next(null, userToken);
        });
    };

    return {
        model: UserToken,
        renew: renew,
        getByFacebookToken: getByFacebookToken
    }
})();

module.exports = UserTokensRepo;