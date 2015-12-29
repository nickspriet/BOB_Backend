var facebookAPI = require('./facebookAPI');
var Ride = require('../models/Ride');
var UserToken = require('../models/UserToken');
var async = require('async');

function _getEvent(facebookToken, eventId, cb) {
  facebookAPI(facebookToken).getEvent(eventId)
    .then(function (result) {
      if (result.error) return cb(result.error);
      cb(null, result);
    })
    .catch(cb);
}


/**
 * Create a new Ride from an Event and User id
 * @param {String} eventId The id for the event
 * @param {String} token Our token
 */
function createFromEvent(token, eventId, cb) {
	UserToken.findOne({'token': token}, function(err, userToken) {
		if (err) return cb(err);
		if (!userToken) return cb(new Error('No user with this token'));

		_getEvent(userToken.facebookToken, eventId, function(err, event) {
			if (err) return cb(err);

			Ride.findOne({
				event: eventId,
				driver: userToken.userId
			}, function(err, existingRide) {
				if (err) return cb(err);
				if (existingRide) return cb(null, existingRide);

				var ride = new Ride({
					event: eventId,
					driver: userToken.userId,
					approved: [],
					requests: [],
					description: '',
					startTime: event.start_time,
					endTime: event.end_time,
					place: event.place
				});

				ride.save(cb);
			});
		});
	});
}

/**
 * Get the rides for the authenticated user
 * @param {String} token AccessToken
 */
function getRides(token, cb) {
	UserToken.findOne({'token': token}, function(err, userToken) {
		if (err) return cb(err);
		if (!userToken) return cb(new Error('No user with this token'));

		var userId = userToken.userId;
		var fb = facebookAPI(userToken.facebookToken);

		Ride.find({
				driver: userId
			})
			.populate('driver')
			.exec(function(err, rides) {
				async.map(rides, function(r, callback) {
					fb.getEvent(r.event)
				    .then(function (event) {
				      if (event.error) return cb(event.error);

							event.cover = event.cover.source;
			        event.picture = event.picture.data.url;

							r.event = event;

				      callback(null, r);
				    })
				    .catch(callback);
				}, cb);
			});
	});
}

/**
 * Get the rides for the authenticated user
 * @param {String} id ID of the ride
 * @param {String} token AccessToken
 */
function getRide(id, token, cb) {
	UserToken.findOne({'token': token}, function(err, userToken) {
		if (err) return cb(err);
		if (!userToken) return cb(new Error('No user with this token'));

		var userId = userToken.userId;
		var fb = facebookAPI(userToken.facebookToken);

		Ride.findOne({
        _id: id,
				driver: userId
			})
			.populate('driver')
			.exec(function(err, ride) {
				fb.getEvent(ride.event)
			    .then(function (event) {
			      if (event.error) return cb(event.error);

						event.cover = event.cover.source;
		        event.picture = event.picture.data.url;

						ride.event = event;

			      cb(null, ride);
			    })
			    .catch(cb);
			});
	});
}


module.exports.createFromEvent = createFromEvent;
module.exports.getRides = getRides;
module.exports.getRide = getRide;
