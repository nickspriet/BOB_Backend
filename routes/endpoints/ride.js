var showError = require('../error');
var RidesRepo = require('../../data/repositories/RidesRepo');
var UserTokensRepo = require('../../data/repositories/UserTokensRepo');
var async = require('async');
var facebookApi = require('../api/facebookApi');

var ride = (function () {
    /**
     * Create a new Ride from an Event and User id
     * @param {String} eventId The id for the event
     * @param {String} token Our token
     */
    var create = function (req, res) {
        facebookApi(req.userToken.facebookToken).getByFacebookEventId(req.body.eventId, function (err, event) {
            if (err) showError.response(res)(err, err.message);

            RidesRepo.createFromEvent(req.userToken.userId, event, function (err, ride) {
                if (err) return showError.response(res)(err, 'Failed to create ride from event');

                return res.send({
                    statusCode: 200,
                    message: 'OK',
                    data: {
                        ride: ride
                    }
                });
            });
        });
    };


    /**
     * Get the rides for the authenticated user
     * @param {String} token AccessToken
     */
    var getRides = function (req, res) {
        RidesRepo.getAllByDriver(req.userToken.userId, function (err, rides) {
            if (err) return showError.response(res)(err, err.message);

            async.map(rides, function (ride, cb) {
                facebookApi(req.userToken.facebookToken).getByFacebookEventId(ride.eventId, function (err, event) {
                    if (err) return showError.response(res)(err, err.message);
                    if (event.error) return showError.response(res)(event.error, event.error.message);

                    //TODO => delete this and handle error in android
                    event.description = event.description ? event.description : '';
                    event.cover = event.cover ? event.cover.source : '';
                    event.picture = event.picture.data.url ? event.picture.data.url : '';

                    //add event to model
                    ride._doc.event = event;

                    cb(null, ride);
                });
            }, showRides);

            function showRides(err, rides) {
                if (err) return showError.response(res)(err, err.message);
                if (!rides) return showError.response(res)(err, 'No rides found for this event');
                res.send({
                    statusCode: 200,
                    message: 'OK',
                    data: {
                        rides: rides
                    }
                });
            }
        });
    };


    /**
     * Get the rides for the authenticated user
     * @param {String} id ID of the ride
     * @param {String} token AccessToken
     */
    var getRide = function (req, res) {
        RideController.getRide(req.params.id, req.query.token, function (err, ride) {
            if (err) return showError.response(res)(err, 'Failed to get ride');
            res.send({
                statusCode: 200,
                message: 'OK',
                data: {
                    ride: ride
                }
            });
        });
    };

    var getRide2 = function (req, res) {
        UserTokensRepo.getByFacebookToken(req.query.token, function (err, userToken) {
            if (err) return showError.response(res)(err, err.message);
            var fb = FacebookAPI(userToken);

            RidesRepo.getById(req.params.id, function (err, ride) {
                if (err) showError.response(res)(err, err.message);

                fb.getEvent(ride.event).then(function (event) {
                    if (event.error) return showError.response(res)(event.error, event.error.message);

                    event.cover = event.cover.source;
                    event.picture = event.picture.data.url;
                    //ride.event = event;

                    res.send({
                        statusCode: 200,
                        message: 'OK',
                        data: {
                            ride: ride
                        }
                    });
                })
            });
        });
    };


    return {
        create: create,
        getRides: getRides
    }
})();


module.exports = ride;