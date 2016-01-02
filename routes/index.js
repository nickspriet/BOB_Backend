/**
 * routes/endpoints/index.js
 */
var express = require('express');
var router = express.Router();
var showError = require('./error');

//endpoints
var index = require('./endpoints/index');
var user = require('./endpoints/user');
var event = require('./endpoints/event');
var ride = require('./endpoints/ride');
var webhook = require('./endpoints/webhook');


//middleware
var loadUserToken = require('./middleware/loadUserToken');
var auth = require('./middleware/auth');


//routes
router.get('/', index.home);

router.post('/api/user/login', auth.findOrCreateUser, auth.createToken, user.login);
router.get('/api/user/profile', loadUserToken, user.profile);

router.get('/event', event.getEvents);
//router.post('/event/save', event.save);

router.get('/ride', ride.getRides);
router.get('/ride/:id', ride.getRide);
router.post('/ride', ride.create);

router.get('/webhook', webhook.testje);
router.post('/webhook', webhook.addEvent);


router.get('/api/*', showError.notFound);

module.exports = router;
