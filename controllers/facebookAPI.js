var request = require('request-promise');
var pkg = require('../package.json');


var fbBaseUrl = 'https://graph.facebook.com/v2.5/',
  fbHeaders = {'User-Agent': pkg.name + '/' + pkg.version};

/**
 * @class FacebookAPI
 * @description Builds a Facebook API
 * @param {String} accessToken
 */
function FacebookAPI(accessToken) {
  this.accessToken = accessToken;
}

/**
 * Get the profile for the connected user
 * @returns {Promise}
 */
FacebookAPI.prototype.getProfile = function () {
  return request({
    baseUrl: fbBaseUrl,
    uri: '/me',
    method: 'GET',
    headers: fbHeaders,
    qs: {
      'access_token': this.accessToken,
      'fields': 'id,name,email,picture,first_name,gender,location,is_verified,last_name,link,locale,third_party_id,timezone,verified,cover'
    },
    json: true,
    useQuerystring: true
  });
};


FacebookAPI.prototype.getEvents = function () {
  return request({
    baseUrl: fbBaseUrl,
    uri: '/me',
    method: 'GET',
    headers: fbHeaders,
    qs: {
      'access_token': this.accessToken,
      'fields': 'id,name,events'
    },
    json: true,
    useQuerystring: true
  });
};

module.exports = function (accessToken) {
  return new FacebookAPI(accessToken);
};
