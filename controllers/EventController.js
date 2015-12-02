/**
 * Created by Nick Spriet on 29/11/2015.
 */
var FacebookAPI = require('./FacebookAPI');
var Event = require('../models/Event');
var UserToken = require('../models/UserToken');
var async = require("async");

/**
 * Returns the user's events
 */
function getEvents(token, cb) {
  UserToken.findOne({'token': token}, function (err, userToken) {
    if (err) return cb(err);

    if (!userToken) return cb(new Error('Invalid token'));
    else {
      Event.find(function (err, events) {
        if (err) return cb(err);
        if (!events) return cb(new Error('Invalid events'));
        console.log('Get events in controller', events);
        cb(null, events);
      });
    }
  });
}


function saveEvents(token, cb) {
  UserToken.findOne({'token': token}, function (err, userToken) {
    if (err) return cb(err);

    if (!userToken) return cb(new Error('Invalid token'));
    else {
      FacebookAPI(userToken.facebookToken).getEvents()
        .then(function (result) {
          if (result.error) return cb(result.error);

          async.each(result.events.data, saveEvent, function (err) {
            return cb(err);
          });
        })
        .catch(cb);
    }
  });
}

var saveEvent = function (event, cb) {
  console.log("save event in ctrl", event.name);
  var createdEvent = Event.createFromFacebook(event);
  if (createdEvent) createdEvent.save(cb);
  else cb(createdEvent.error);
};

module.exports.getEvents = getEvents;
module.exports.saveEvents = saveEvents;
