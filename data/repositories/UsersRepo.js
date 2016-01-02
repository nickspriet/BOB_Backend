/**
 * Created by Nick on 12/30/15.
 */

var UsersRepo = (function () {
    var User = require('../models/User');

    var getByFacebookId = function (facebookId, next) {
        User.findOne({'facebookID': facebookId}, function (err, profile) {
            if (err) return next(err);

            return next(null, profile);
        });
    };

    var getById = function (userId, next) {
        User.findOne({'_id': userId}, function (err, user) {
            if (err) return next(err);
            if (!user) return next(new Error('No user found for this id'));

            console.log('User logged in', user.name);
            next(null, user);
        });
    };


    return {
        model: User,
        getByFacebookId: getByFacebookId,
        getById: getById
    }
})();

module.exports = UsersRepo;