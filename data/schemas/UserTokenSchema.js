/**
 * Created by Nick on 12/27/2015.
 */
var mongoose = require('mongoose');
var _ = require('lodash');

var UserTokenSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.ObjectId, index: true},
    token: {type: String, index: true},
    facebookToken: String,
    facebookExpirationDate: Date,
    deviceType: String,
    deviceModel: String
});

// Only send required fields
UserTokenSchema.set('toJSON', {
    transform: function(doc, ret) {
        return _.pick(ret, 'token');
    }
});

module.exports = UserTokenSchema;