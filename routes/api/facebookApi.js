/**
 * Created by Nick on 12/31/15.
 */
var FB = require('fb');
var _ = require('lodash');

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

    var getEvents = function (next) {
        FB.api('',
            'post',
            {
                batch: [{
                    method: 'get',
                    relative_url: 'me/events?limit=1000&since=now&fields=id,name,cover,attending_count,declined_count,description,can_guests_invite,interested_count,end_time,owner,noreply_count,place,start_time,rsvp_status,timezone,type,updated_time,guest_list_enabled,attending{name,id,picture,rsvp_status},picture'
                }, {
                    method: 'get',
                    relative_url: 'me/events/not_replied?limit=1000&since=now&fields=id,name,cover,attending_count,declined_count,description,can_guests_invite,interested_count,end_time,owner,noreply_count,place,start_time,rsvp_status,timezone,type,updated_time,guest_list_enabled,attending{name,id,picture,rsvp_status},picture'
                }]
            }, function (res) {
                if (!res || res.error) return next(res);

                var repliedEvents = JSON.parse(res[0].body).data;
                var invitedEvents = JSON.parse(res[1].body).data;

                //concatenate the 2 arrays
                var events = repliedEvents.concat(invitedEvents);

                //sort by start_time
                _.sortBy(events, function (e) {
                    return -1 * e.start_time;
                });

                return next(null, events);
            }
        );
    };

    var getByFacebookEventId = function (eventId, next) {
        FB.api(eventId, {
            fields: ['id,name,cover,attending_count,declined_count,description,can_guests_invite,interested_count,end_time,owner,noreply_count,place,start_time,timezone,type,updated_time,guest_list_enabled,attending{name,id,picture,rsvp_status},picture']
        }, function (res) {
            if (!res || res.error) return next(res);

            return next(null, res);
        });
    };


    return {
        getProfile: getProfile,
        getEvents: getEvents,
        getByFacebookEventId: getByFacebookEventId
    };
};

module.exports = facebookApi;
