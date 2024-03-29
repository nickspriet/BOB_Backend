/**
 * routes/endpoints/user.js:
 *
 */
var showError = require('../error');
var UsersRepo = require('../../data/repositories/UsersRepo');

var user = (function () {
    'use strict';
    /**
     * Login API - The user is authenticating a new device or authenticating for the first time
     */
    var login = function (req, res) {
        // Create a token for the newly connected device
        return res.send({
            statusCode: 200,
            message: 'OK',
            data: {
                user: req.user,
                token: req.userToken
            }
        });
    };

    /**
     * Profile - Get the profile for the authenticated user
     * @param {String} BACKEND_TOKEN AccessToken
     */
    var profile = function (req, res) {
        UsersRepo.getById(req.userToken.userId, function (err, user) {
            if (err) {
                return showError.response(res)(err, 'Failed to get profile');
            }

            res.send({
                statusCode: 200,
                message: 'OK',
                data: {
                    user: user
                }
            });
        });
    };

    /**
     * Save - Save information about the authenticated user in database
     * @param {String} BACKEND_TOKEN AccessToken
     */
    var save = function (req, res) {
        UsersRepo.saveUser(req.userToken.userId, req.body, function (err, user) {
            if (err) {
                return showError.response(res)(err, 'Failed to save user');
            }

            res.send({
                statusCode: 200,
                message: 'OK',
                data: {
                    user: user
                }
            });
        });
    };

    return {
        login: login,
        profile: profile,
        save: save
    };
}());


module.exports = user;
