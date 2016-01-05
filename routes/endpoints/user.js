var showError = require('../error');
var UsersRepo = require('../../data/repositories/UsersRepo');


var user = (function () {
    /**
     * Login API - The user is authenticating a new device
     * or authenticating for the first time
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
     *
     * @param {String} BACKEND_TOKEN AccessToken
     */
    var profile = function (req, res) {
        UsersRepo.getById(req.userToken.userId, function (err, user) {
            if (err) return showError.response(res)(err, 'Failed to get profile');

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
        profile: profile
    };
})();


module.exports = user;
