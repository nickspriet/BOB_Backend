/**
 * Created by Nick on 12/31/15.
 */

var RidesRepo = (function () {
    var Ride = require('../models/Ride');

    var createFromEvent = function (userId, event, next) {
        //check if ride already exists
        Ride.findOne({event: event.id}, function (err, existingRide) {
            if (err) next(err);
            if (existingRide) return next(null, existingRide);

            //ride doesn't exist, create a new ride
            var ride = new Ride({
                event: event.id,
                driver: userId,
                approved: [],
                requests: [],
                description: '',
                startTime: event.start_time,
                endTime: event.end_time,
                place: event.place
            });

            ride.save(next);
        });
    };

    var getAllByDriver = function (userId, next) {
        Ride.find({driver: userId})
            .populate('driver')
            .exec(function (err, rides) {
                if (err) return next(err);
                if (!rides) return next(new Error('No rides found for this user'));

                next(null, rides);
            });
    };

    var getAllByEvent = function (eventId, next) {
        Ride.find({event: eventId})
            .populate('driver')
            .exec(function (err, rides) {
                if (err) return next(err);
                if (!rides) return next(new Error('No rides found for this event'));

                next(null, rides);
            });
    };

    var getById = function (id, next) {
        Ride.findOne({_id: id})
            .populate('driver')
            .exec(function (err, ride) {
                if (err) return next(err);
                if (!ride) return next(new Error('No ride found for this id'));

                console.log('ride', ride);
                next(null, ride);
            });
    };

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
                if (err) return cb(err);
                if (event.error) return cb(event.error);

                //TODO => delete this and handle error in android
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
        getAllByDriver: getAllByDriver,
        getById: getById,
        populateWithEvent: populateWithEvent,
        getAllByEvent: getAllByEvent
    };
})();

module.exports = RidesRepo;
