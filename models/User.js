var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');

var userSchema = new Schema({
  facebookID: {type: String, index: true},
  name: String,
  email: {type: String, index: true},
  picture: String,
  firstName: String,
  lastName: String,
  gender: String,
  isVerified: String, // has the verification mark
  link: String,
  locale: String,
  thirdPartyID: String, // can share this id with third parties
  timezone: Number,
  verified: String, // legit user
  cover: String,
  location: {
    id: String,
    name: String
  }
});

userSchema.statics.createFromFacebook = function (profile) {
  return this({
    facebookID: profile.id,
    name: profile.name,
    email: profile.email,
    picture: profile.picture.data.url,
    firstName: profile.first_name,
    lastName: profile.last_name,
    gender: profile.gender,
    isVerified: profile.is_verified,
    link: profile.link,
    locale: profile.locale,
    thirdPartyID: profile.third_party_id,
    timezone: profile.timezone,
    verified: profile.verified,
    cover: profile.cover.source,
    location: profile.location
  });
};

// Only send required fields
userSchema.set('toJSON', {
  transform: function (doc, ret) {
    return _.pick(ret, '_id', 'facebookID', 'name', 'firstName', 'lastName', 'picture', 'cover', 'link');
  }
});


var User = mongoose.model('User', userSchema);
module.exports = User;
