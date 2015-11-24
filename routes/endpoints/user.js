var _ = require('lodash');
var Auth = require('../../controllers/Auth');
var UserController = require('../../controllers/UserController');

function getParams(req) {
  return _.mapKeys(_.merge(req.query, req.body, req.params),
    function(value, key) {
      return key.substr('com.howest.nmct.bob.'.length);
    }
  );
}

var errResponse = function(res) {
  return function(err) {
    console.error(err);
    res.status(500);
    return res.send({
      statusCode: 500,
      message: 'Failed to get profile',
      error: err
    });
  };
};

/**
 * Login API - The user is authenticating a new device
 * or authenticating for the first time
 *
 * @param {String} FACEBOOK_TOKEN Accesstoken for Facebook
 * @param {String} FACEBOOK_USERID The logged in user id
 * @param {String} FACEBOOK_EXPIRES The expiration date as a string
 */
exports.login = function(req, res) {
  var params = getParams(req);

  // Check if the user is already authenticated
  // Then create a new User or return the existing User
  Auth.findOrCreateUser(params.FACEBOOK_USERID, params.FACEBOOK_TOKEN,
    function(err, user) {
      if (err) return errResponse(res)(err);

      // Create a token for the newly connected device
      Auth.createToken(user,
        params.FACEBOOK_TOKEN, params.FACEBOOK_EXPIRES,
        params.DEVICE_TYPE, params.DEVICE_MODEL,
        function(err, userToken) {
          if (err) return errResponse(res)(err);

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
exports.profile = function(req, res) {
  UserController.getProfile(req.query.token, function(err, profile) {
    if (err) return errResponse(res)(err);
    res.send({
      statusCode: 200,
      message: 'OK',
      data: {
        user: profile
      }
    });
  });
};
