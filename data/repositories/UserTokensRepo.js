/**
 * Created by Nick on 12/30/15.
 */

var UserTokensRepo = (function () {
    var UserToken = require('../models/UserToken');

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
        getByFacebookToken: getByFacebookToken
    }
})();

module.exports = UserTokensRepo;