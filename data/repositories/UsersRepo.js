/**
 * Created by Nick on 12/30/15.
 */

var UsersRepo = (function () {
    var User = require('../models/User');

    var getByFacebookUserId = function (facebookUserId, next) {
        User.findOne({'facebookID': facebookUserId}, function (err, profile) {
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

    var saveUser = function (userId, newUser, next) {
        User.findByIdAndUpdate(
            userId,
            {$set: newUser},
            {'new': true},
            next);
    };


    return {
        model: User,
        getByFacebookUserId: getByFacebookUserId,
        getById: getById,
        saveUser: saveUser
    };
})();

module.exports = UsersRepo;
