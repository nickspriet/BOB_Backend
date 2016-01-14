/**
 * repositories/RidesRepo.js:
 * Data accessor for Rides
 */

var RidesRepo = (function () {
    'use strict';
    var User = require('../models/User');
    var Ride = require('../models/Ride');

    /**
     * Create a ride based on the facebook event
     * @param: {String} userId ID of the user
     * @param {Event} event The facebook event
     * @param {Function} next The callback
     */
    var createFromEvent = function (userId, event, next) {
        //check if ride already exists
        Ride.findOne({event: event.id}, function (err, existingRide) {
            if (err) {
                next(err);
            }
            if (existingRide) {
                return next(null, existingRide);
            }

            //ride doesn't exist, create a new ride
            var ride = new Ride({
                event: event.id,
                driver: userId,
                approved: [],
                requests: [],
                description: event.description || '',
                startTime: event.start_time,
                endTime: event.end_time,
                place: event.place
            });

            ride.save(next);
        });
    };


    /**
     * Get all the rides for the authenticated user
     * @param: {String} userId ID of the user
     * @param {Function} next The callback
     */
    var getAllForUser = function (userId, next) {
        Ride.find({
                $or: [
                    {driver: userId},
                    {requests: userId},
                    {approved: userId}
                ]
            })
            .populate('driver')
            .populate({path: 'requests', model: User})
            .populate({path: 'approved', model: User})
            .exec(function (err, rides) {
                if (err) {
                    return next(err);
                }
                if (!rides) {
                    return next(new Error('No rides found for this user'));
                }

                next(null, rides);
            });
    };

    /**
     * Get all the rides for a facebook event
     * @param: {String} event The id of a facebook event
     * @param {Function} next The callback
     */
    var getAllByEvent = function (eventId, next) {
        Ride.find({event: eventId})
            .populate('driver')
            .populate({path: 'requests', model: User})
            .populate({path: 'approved', model: User})
            .exec(function (err, rides) {
                if (err) {
                    return next(err);
                }
                if (!rides) {
                    return next(new Error('No rides found for this event'));
                }

                next(null, rides);
            });
    };

    /**
     * Get all the ride by the specified id
     */
    var getById = function (id, next) {
        Ride.findOne({_id: id})
            .populate('driver')
            .populate({path: 'requests', model: User})
            .populate({path: 'approved', model: User})
            .exec(function (err, ride) {
                if (err) {
                    return next(err);
                }
                if (!ride) {
                    return next(new Error('No ride found for this id'));
                }

                next(null, ride);
            });
    };

    /**
     * Get all the ride by the specified id
     */
    var addRequest = function (rideid, userid, next) {
        Ride.findByIdAndUpdate(
            rideid,
            {$push: {'requests': userid}},
            {'safe': true, 'new': true})
            .exec(next);
    };


    /**
     * Get all the ride by the specified id
     * @param: {facebookAPi}
     */
    var eventsCache = {};
    var populateWithEvent = function (fbAPI) {
        return function (ride, cb) {
            var eventId = ride._doc.event;
            if (eventsCache[eventId]) {
                ride._doc.event = eventsCache[eventId];
                cb(null, ride);
                return;
            }
            fbAPI.getByFacebookEventId(eventId, function (err, event) {
                if (err) {
                    return cb(err);
                }
                if (event.error) {
                    return cb(event.error);
                }

                event.description = event.description ? event.description : '';
                event.cover = event.cover ? event.cover.source : '';
                event.picture = event.picture.data.url ? event.picture.data.url : '';

                //add event to model
                ride._doc.event = event;
                eventsCache[eventId] = event;

                cb(null, ride);
            });
        };
    };

    return {
        model: Ride,
        createFromEvent: createFromEvent,
        getAllForUser: getAllForUser,
        getById: getById,
        populateWithEvent: populateWithEvent,
        getAllByEvent: getAllByEvent,
        addRequest: addRequest
    };
}());

module.exports = RidesRepo;
