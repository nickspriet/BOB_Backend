var request = require('supertest');
var app = require('../app.js');

/*
request(app)
  .post('/api/ride')
	.send({
		token: '564c364f3b96585f1d3f781f|eyvtkLaTu8Ay-ZCYuA7kEFb',
		eventId: '416927091838531'
	})
  .end(function(err, res, body) {
    if (err) throw err;
		console.log(res.body);
  });
*/

/*
request(app)
  .get('/api/ride')
	.query({
		token: '564c364f3b96585f1d3f781f|eyvtkLaTu8Ay-ZCYuA7kEFb'
	})
  .end(function(err, res) {
    if (err) throw err;
		console.log(res.body.data.rides);
  });
  */


request(app)
  .get('/api/ride/568826755924550e65792401')
	.query({
		token: '564c364f3b96585f1d3f781f|eyvtkLaTu8Ay-ZCYuA7kEFb'
	})
  .end(function(err, res) {
    if (err) throw err;
		console.log(res.body);
  });
