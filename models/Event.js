/**
 * Created by Nick Spriet on 29/11/2015.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var eventSchema = new Schema({
  name: String
});

eventSchema.statics.createFromFacebook = function (event) {
  return this({
    name: event.name
  });
};


var Event = mongoose.model('Event', eventSchema);
module.exports = Event;
