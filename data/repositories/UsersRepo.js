/**
 * repositories/UsersRepo.js:
 * Data accessor for Users
 */

var UsersRepo = (function () {
    'use strict';
    var User = require('../models/User');

    /**
     * Returns the User by the specified UserId of Facebook
     * @param: {String} facebookUserId The facebook id of the user
     * @param {Function} next The callback
     */
    var getByFacebookUserId = function (facebookUserId, next) {
        User.findOne({'facebookID': facebookUserId}, function (err, profile) {
            if (err) {
                return next(err);
            }

            return next(null, profile);
        });
    };

    /**
     * Returns the User by the specified UserId
     * @param: {String} userId ID of the user
     * @param {Function} next The callback
     */
    var getById = function (userId, next) {
        User.findOne({'_id': userId}, function (err, user) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return next(new Error('No user found for this id'));
            }

            console.log('User logged in', user.name);
            next(null, user);
        });
    };


    /**
     * Update the User by the specified userId
     * @param: {String} userId ID of the user
     * @param {User} newUser The user that is most up to date
     * @param {Function} next The callback
     */
    var saveUser = function (userId, newUser, next) {
        User.findByIdAndUpdate(userId, {$set: newUser}, {'new': true}, next);
    };


    return {
        model: User,
        getByFacebookUserId: getByFacebookUserId,
        getById: getById,
        saveUser: saveUser
    };
}());

module.exports = UsersRepo;
