/**
 * Created by Nick Spriet on 02/12/2015.
 */
var EventController = require('../../controllers/EventController');
var errResponse = require('./error');

/**
 * Event - Get the events for the authenticated user
 *
 * @param {String} BACKEND_TOKEN AccessToken
 */
exports.getEvents = function (req, res) {
    EventController.getEvents(req.query.token, function (err, events, paging) {
        if (err) return errResponse(res)(err, 'Failed to get events');

        res.send({
            statusCode: 200,
            message: 'OK',
            data: {
                events: events,
                paging: paging
            }
        });
    });
};


/**
 * Event - Save the events for the authenticated user
 *
 * @param {String} BACKEND_TOKEN AccessToken
 */
//exports.save = function (req, res) {
//    EventController.saveEvents(req.body.token, function (err, events) {
//        if (err) return errResponse(res)(err);
//
//        return res.send({
//            statusCode: 200,
//            message: 'OK',
//            data: {
//                events: events
//            }
//        });
//    });
//};
