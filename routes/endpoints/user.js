var _ = require('lodash');
var Auth = require('../../controllers/Auth');
var errResponse = require('./error');
var UserController = require('../../controllers/UserController');
var UsersRepo = require('../../data/repositories/UsersRepo');



function getParams(req) {
    return _.mapKeys(_.merge(req.query, req.body, req.params),
        function (value, key) {
            return key.substr('com.howest.nmct.bob.'.length);
        }
    );
}


var user = (function () {
    /**
     * Login API - The user is authenticating a new device
     * or authenticating for the first time
     *
     * @param {String} FACEBOOK_TOKEN Accesstoken for Facebook
     * @param {String} FACEBOOK_USERID The logged in user id
     * @param {String} FACEBOOK_EXPIRES The expiration date as a string
     */
    var login = function (req, res) {
        var params = getParams(req);

        // Check if the user is already authenticated
        // Then create a new User or return the existing User
        Auth.findOrCreateUser(params.FACEBOOK_USERID, params.FACEBOOK_TOKEN, function (err, user) {
            if (err) return errResponse(res)(err, 'Failed to find/create user');

            // Create a token for the newly connected device
            Auth.createToken(user, params.FACEBOOK_TOKEN, params.FACEBOOK_EXPIRES, params.DEVICE_TYPE, params.DEVICE_MODEL, function (err, userToken) {
                if (err) return errResponse(res)(err, 'Failed to create token');

                return res.send({
                    statusCode: 200,
                    message: 'OK',
                    data: {
                        user: user,
                        token: userToken
                    }
                });

            });
        });
    };


    /**
     * Profile - Get the profile for the authenticated user
     *
     * @param {String} BACKEND_TOKEN AccessToken
     */
    var profile = function (req, res) {
        UserController.getProfile(req.query.token, function (err, profile) {
            if (err) return errResponse(res)(err, 'Failed to get profile');
            res.send({
                statusCode: 200,
                message: 'OK',
                data: {
                    user: profile
                }
            });
        });
    };

    //var profile2 = function(req, res){
    //    UsersRepo.getByToken(req.query.token, function(err, user){
    //        if (err) return
    //    });
    //};

    return {
        login: login,
        profile: profile
    }
})();


module.exports = user;
