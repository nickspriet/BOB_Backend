var showError = require('../error');
var RidesRepo = require('../../data/repositories/RidesRepo');
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
        RidesRepo.getAllForUser(req.userToken.userId, function (err, rides) {
            if (err) return showError.response(res)(err, err.message);

            var fbAPI = facebookApi(req.userToken.facebookToken);
            async.map(rides, RidesRepo.populateWithEvent(fbAPI), function(err, rides) {
                if (err) return showError.response(res)(err, err.message);
                if (!rides) return showError.response(res)(err, 'No rides found for this event');
                res.send({
                  statusCode: 200,
                  message: 'OK',
                  data: {
                    rides: rides
                  }
                });
            });
        });
    };

    var getRidesForEvent = function (req, res) {
        RidesRepo.getAllByEvent(req.params.id, function (err, rides) {
            if (err) return showError.response(res)(err, err.message);

            var fbAPI = facebookApi(req.userToken.facebookToken);
            async.map(rides, RidesRepo.populateWithEvent(fbAPI), function(err, rides) {
                if (err) return showError.response(res)(err, err.message);
                if (!rides) return showError.response(res)(err, 'No rides found for this event');
                res.send({
                  statusCode: 200,
                  message: 'OK',
                  data: {
                    rides: rides
                  }
                });
            });
        });
    };


    /**
     * Get the rides for the authenticated user
     * @param {String} id ID of the ride
     * @param {String} token AccessToken
     */
    var getRide = function (req, res) {
        RidesRepo.getById(req.params.id, function (err, ride) {
            if (err) return showError.response(res)(err, 'Failed to get ride');

            var fbAPI = facebookApi(req.userToken.facebookToken);
            RidesRepo.populateWithEvent(fbAPI)(ride, function(err, ride) {
                if (err) return showError.response(res)(err, err.message);
                if (!ride) return showError.response(res)(err, 'No event found for this ride');

                res.send({
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
     * Add a request to a ride for the current user
     * @param {String} rideid ID of the ride
     * @param {String} token AccessToken
     */
    var requestRide = function (req, res) {
        RidesRepo.addRequest(req.body.rideid, req.userToken.userId, function (err, ride) {
            if (err) return showError.response(res)(err, 'Failed to add request');

            var fbAPI = facebookApi(req.userToken.facebookToken);
            RidesRepo.populateWithEvent(fbAPI)(ride, function(err, ride) {
                if (err) return showError.response(res)(err, err.message);
                if (!ride) return showError.response(res)(err, 'No event found for this ride');

                res.send({
                  statusCode: 200,
                  message: 'OK',
                  data: {
                    ride: ride
                  }
                });
            });
        });
    };

    return {
        create: create,
        getRide: getRide,
        getRides: getRides,
        getRidesForEvent: getRidesForEvent,
        requestRide: requestRide
    };
})();


module.exports = ride;
