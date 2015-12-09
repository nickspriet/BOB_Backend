var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var rideSchema = new Schema({
  event: {type: Schema.Types.Mixed},
	driver: {type: Schema.Types.ObjectId, ref: 'User'},
	approved: {type: [Schema.Types.ObjectId], ref: 'User'},
	requests: {type: [Schema.Types.ObjectId], ref: 'User'},
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

var Ride = mongoose.model('Ride', rideSchema);
module.exports = Ride;
