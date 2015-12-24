var request = require('supertest');
var app = require('../index.js');

/*
request(app)
  .post('/ride')
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
  .get('/ride')
	.query({
		token: '564c364f3b96585f1d3f781f|eyvtkLaTu8Ay-ZCYuA7kEFb'
	})
  .end(function(err, res) {
    if (err) throw err;
		console.log(res.body.data.rides);
  });
  */


request(app)
  .get('/ride/56686aeff07b3c7b78d4fc7b')
	.query({
		token: '564c364f3b96585f1d3f781f|eyvtkLaTu8Ay-ZCYuA7kEFb'
	})
  .end(function(err, res) {
    if (err) throw err;
		console.log(res.body);
  });
