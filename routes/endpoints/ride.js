var RideController = require('../../controllers/RideController');
var errResponse = require('./error');


/**
 * Get the rides for the authenticated user
 * @param {String} token AccessToken
 */
exports.getRides = function (req, res) {
    RideController.getRides(req.query.token, function (err, rides) {
        if (err) return errResponse(res)(err, 'Failed to get rides');
        res.send({
            statusCode: 200,
            message: 'OK',
            data: {
                rides: rides
            }
        });
    });
};


/**
 * Get the rides for the authenticated user
 * @param {String} id ID of the ride
 * @param {String} token AccessToken
 */
exports.getRide = function (req, res) {
    RideController.getRide(req.params.id, req.query.token, function (err, ride) {
        if (err) return errResponse(res)(err, 'Failed to get ride');
        res.send({
            statusCode: 200,
            message: 'OK',
            data: {
                ride: ride
            }
        });
    });
};


/**
 * Create a new Ride from an Event and User id
 * @param {String} eventId The id for the event
 * @param {String} token Our token
 */
exports.create = function (req, res) {
    RideController.createFromEvent(req.body.token, req.body.eventId, function (err, ride) {
        if (err) return errResponse(res)(err, 'Failed to create ride from event');

        return res.send({
            statusCode: 200,
            message: 'OK',
            data: {
                ride: ride
            }
        });
    });
};
