/**
 * Created by Nick on 12/29/2015.
 */
var mongoose = require('mongoose');

var RideSchema = new mongoose.Schema({
    event: {type: mongoose.Schema.Types.Mixed},
    driver: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    approved: {type: [mongoose.Schema.Types.ObjectId], ref: 'User'},
    requests: {type: [mongoose.Schema.Types.ObjectId], ref: 'User'},
    description: String,
    startTime: String,
    endTime: String,
    place: {
        id: String,
        name: String,
        location: {
            city: String,
            country: String,
            latitude: Number,
            longitude: Number,
            street: String,
            zip: String
        }
    }
});

module.exports = RideSchema;
