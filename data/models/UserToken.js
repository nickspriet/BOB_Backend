/**
 * models/UserToken.js
 */

var mongoose = require('mongoose');
var UserTokenSchema = require('../schemas/UserTokenSchema');

var UserToken = mongoose.model('UserToken', UserTokenSchema);
module.exports = UserToken;
