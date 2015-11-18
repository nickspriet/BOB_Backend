var User = require('../models/User');
var UserToken = require('../models/UserToken');

/**
 * Returns the user's profile
 */
function getProfile(token, cb) {
  UserToken.findOne({'token': token}, function(err, userToken) {
    if (err) return cb(err);
    if (!userToken) return cb(new Error('Invalid token'));

    if (userToken) {
      User.findOne({'_id': userToken.userId}, function(err, user) {
        if (err) return cb(err);
        if (!user) return cb(new Error('Invalid token'));
        console.log('User logged in', user.name);
        cb(null, user);
      });
    }
  });
}

module.exports.getProfile = getProfile;
