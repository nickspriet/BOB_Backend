var facebookAPI = require('./facebookAPI');
var User = require('../models/User');
var UserToken = require('../models/UserToken');
var crypto = require('crypto');

 /**
  * Create a new user. Gets a profile from Facebook using the facebookToken.
  * @param {String} facebookToken The accessToken from Facebook
  * @param {Function} cb Callback(Error err, User user)
  */
function createUser(facebookToken, cb) {
  facebookAPI(facebookToken).getProfile()
    .then(function(profile) {
      if (profile.error) return cb(profile.error);
      var user = User.createFromFacebook(profile);
      console.info('User created', user.name);
      user.save(cb);
    })
    .catch(cb);
}

/**
 * Check if the user is already authenticated
 * Then create a new User or return the existing User
 * @param {String} facebookID Authenticated user's id to check
 * @param {String} facebookToken The accessToken from Facebook
 * @param {Function} cb Callback(Error err, User user)
 */
 function findOrCreateUser(facebookID, facebookToken, cb) {
   User.findOne({'facebookID': facebookID}, function(err, profile) {
     if (err) return cb(err);
     if (profile) {
       // There is already a profile, return this
       console.info('Profile exists', profile.name);
       cb(null, profile);
     } else {
       // No user, so make one
       console.info('Creating user');
       createUser(facebookToken, cb);
     }
   });
 }



/**
 * Creates a new token for the user and device
 * @param {User} user The user for whom to create a token for
 * @param {String} facebookToken The accessToken from Facebook
 * @param {String} facebookExpirationString Expiration date as a String
 * @param {String} deviceType The device type "android" for now
 * @param {String} deviceModel The identifier of the device
 * @param {Function} cb Callback(Error err, String token)
 */
function createToken(user, facebookToken, facebookExpirationString, deviceType, deviceModel, cb) {
  // Get rid of previous tokens on the same device for the current user
  UserToken.remove({
    deviceType: deviceType,
    deviceModel: deviceModel,
    userId: user._id
  }, function() {
    var userToken = new UserToken({
      userId: user._id,
      facebookToken: facebookToken,
      facebookExpirationDate: new Date(facebookExpirationString),
      deviceType: deviceType,
      deviceModel: deviceModel
    });

    crypto.randomBytes(48, function(ex, buf) {
      // make the string url safe
      var token = buf.toString('base64').replace(/\//g, '_').replace(/\+/g, '-');
      // embed the userId in the token, and shorten it
      userToken.token = userToken.userId + '|' + token.toString().slice(1, 24);
      userToken.save(function(err) {
        if (err) return cb(err);
        cb(null, userToken.token);
      });
    });
  });

}

module.exports.findOrCreateUser = findOrCreateUser;
module.exports.createToken = createToken;
