var express = require('express');
var router = express.Router();

var index = require('./endpoints/index');
var api = require('./endpoints/api');
var user = require('./endpoints/user');
var event = require('./endpoints/event');
var webhook = require('./endpoints/webhook');
var ride = require('./endpoints/ride');


router.get('/', index.home);

router.get('/api/*', api.notFound);
router.get('/api/ping', api.ping);
//router.post('/api/ping', api.ping);

router.post('/user/login', user.login);
router.get('/user/profile', user.profile);

router.get('/event', event.getEvents);
//router.post('/event/save', event.save);

router.get('/ride', ride.getRides);
router.get('/ride/:id', ride.getRide);
router.post('/ride', ride.create);

router.get('/webhook', webhook.testje);
router.post('/webhook', webhook.addEvent);


module.exports = router;
