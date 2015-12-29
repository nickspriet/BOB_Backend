/**
 * Created by Nick Spriet on 29/11/2015.
 */
var mongoose = require('mongoose');
var EventSchema = require('../schemas/EventSchema');

var Event = mongoose.model('Event', EventSchema);
module.exports = Event;
