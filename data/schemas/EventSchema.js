/**
 * Created by Nick on 12/27/2015.
 */
var mongoose = require('mongoose');


var EventSchema = new mongoose.Schema({
    name: String
});

EventSchema.statics.createFromFacebook = function (event) {
    return this({
        name: event.name
    });
};

module.exports = EventSchema;