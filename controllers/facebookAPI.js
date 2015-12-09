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
    uri: '/me/events',
    method: 'GET',
    headers: fbHeaders,
    qs: {
      'access_token': this.accessToken,
      'fields': 'id,name,cover,attending_count,declined_count,description,can_guests_invite,interested_count,end_time,owner,noreply_count,place,start_time,rsvp_status,timezone,type,updated_time,guest_list_enabled,attending{name,id,picture,rsvp_status},picture'
    },
    json: true,
    useQuerystring: true
  });
};


FacebookAPI.prototype.getEvent = function (eventId) {
  return request({
    baseUrl: fbBaseUrl,
    uri: '/' + eventId,
    method: 'GET',
    headers: fbHeaders,
    qs: {
      'access_token': this.accessToken,
      'fields': 'id,name,cover,attending_count,declined_count,description,can_guests_invite,interested_count,end_time,owner,noreply_count,place,start_time,timezone,type,updated_time,guest_list_enabled,attending{name,id,picture,rsvp_status},picture'
    },
    json: true,
    useQuerystring: true
  });
};

module.exports = function (accessToken) {
  return new FacebookAPI(accessToken);
};
