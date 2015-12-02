var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');

var userTokenSchema = new Schema({
  userId: {type: Schema.ObjectId, index: true},
  token: {type: String, index: true},
  facebookToken: String,
  facebookExpirationDate: Date,
  deviceType: String,
  deviceModel: String
});

// Only send required fields
userTokenSchema.set('toJSON', {
  transform: function(doc, ret) {
    return _.pick(ret, 'token');
  }
});


var UserToken = mongoose.model('UserToken', userTokenSchema);
module.exports = UserToken;
