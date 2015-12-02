/**
 * Created by Nick Spriet on 02/12/2015.
 */
var EventController = require('../../controllers/EventController');

var errResponse = function (res) {
  return function (err) {
    console.error(err);
    res.status(500);
    return res.send({
      statusCode: 500,
      message: 'Failed to get events',
      error: err
    });
  };
};


/**
 * Event - Get the events for the authenticated user
 *
 * @param {String} BACKEND_TOKEN AccessToken
 */
exports.getEvents = function (req, res) {
  EventController.getEvents(req.query.token, function (err, events) {
    if (err) return errResponse(res)(err);
    res.send({
      statusCode: 200,
      message: 'OK',
      data: {
        events: events
      }
    });
  });
};




/**
 * Event - Save the events for the authenticated user
 *
 * @param {String} BACKEND_TOKEN AccessToken
 */
exports.save = function (req, res) {
  EventController.saveEvents(req.body.token, function (err, events) {
    if (err) return errResponse(res)(err);

    return res.send({
      statusCode: 200,
      message: 'OK',
      data: {
        events: events
      }
    });
  });
};
