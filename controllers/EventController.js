/**
 * Created by Nick Spriet on 29/11/2015.
 */
var FacebookAPI = require('./FacebookAPI');
var Event = require('../data/models/Event');
var UserToken = require('../data/models/UserToken');
var async = require('async');


function _getEvents(facebookToken, cb) {
  FacebookAPI(facebookToken).getEvents()
    .then(function (result) {
      if (result.error) return cb(result.error);
      var events = result.data;
      cb(null, events, result.paging);
    })
    .catch(cb);
}

/**
 * Returns the user's events
 */
function getEvents(token, cb) {
    UserToken.findOne({'token': token}, function (err, userToken) {
    if (err) return cb(err);
    if (!userToken) return cb(new Error('Invalid token'));

    _getEvents(userToken.facebookToken, function(err, events, paging) {
      if (err) return cb(err);
      events.forEach(function(e) {
        e.cover = e.cover.source;
        e.picture = e.picture.data.url;
      });
      cb(null, events, paging);
    });
  });
}

function saveEvent(event, cb) {
  console.log('save event in ctrl', event.name);
  var createdEvent = Event.createFromFacebook(event);
  if (createdEvent) createdEvent.save(cb);
  else cb(createdEvent.error);
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


module.exports.getEvents = getEvents;
module.exports.saveEvents = saveEvents;
