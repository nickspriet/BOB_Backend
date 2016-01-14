/**
 * routes/endpoints/event.js:
 *
 */
var facebookApi = require('../../routes/api/facebookApi');
var showError = require('../error');
var async = require('async');

var event = (function () {
    'use strict';
    /**
     * Event - Get the events for the authenticated user
     * @param {String} BACKEND_TOKEN AccessToken
     */
    var getEvents = function (req, res) {

        facebookApi(req.userToken.facebookToken).getEvents(function (err, result) {
            if (err) {
                return showError.response(res)(err, err.message);
            }

            var events = result.reverse();
            events.forEach(function (e) {
                //TODO => delete this and handle error in android
                e.description = e.description ? e.description : '';
                e.cover = e.cover ? e.cover.source : '';
                e.picture = e.picture.data.url ? e.picture.data.url : '';
            });

            res.send({
                statusCode: 200,
                message: 'OK',
                data: {
                    events: events
                }
            });
        });
    };

    return {
        getEvents: getEvents
    };
}());

module.exports = event;