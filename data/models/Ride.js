var mongoose = require('mongoose');
var RideSchema = require('../schemas/RideSchema');

var Ride = mongoose.model('Ride', RideSchema);
module.exports = Ride;
