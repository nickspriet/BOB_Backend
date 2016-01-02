/**
 * Created by Nick on 12/31/15.
 */
var FB = require('fb');


/**
 * @class FacebookAPI
 * @description Builds a Facebook API
 * @param {String} accessToken
 */
var facebookApi = function (accessToken) {
    FB.setAccessToken(accessToken);

    var getProfile = function (next) {
        FB.api('/me', {
            fields: ['id,name,email,picture,first_name,gender,location,is_verified,last_name,link,locale,third_party_id,timezone,verified,cover']
        }, function (res) {
            if (!res || res.error) return next(res);

            return next(null, res);
        });
    };

    var getEvents = function () {
        return FB.api('me/events', {
            fields: ['id,name,cover,attending_count,declined_count,description,can_guests_invite,interested_count,end_time,owner,noreply_count,place,start_time,rsvp_status,timezone,type,updated_time,guest_list_enabled,attending{name,id,picture,rsvp_status},picture']
        }, function (res) {
            if (!res || res.error) {
                console.error(!res ? 'error occurred' : res.error);
                return;
            }
            console.log(res);
        });
    };

    return {
        getProfile: getProfile,
        getEvents: getEvents
    }
};

module.exports = facebookApi;
