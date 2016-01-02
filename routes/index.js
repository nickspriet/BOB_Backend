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
var userTokenMW = require('./middleware/userTokenMW');
var auth = require('./middleware/auth');


//routes
router.get('/', index.home);

router.post('/api/user/login', auth.findOrCreateUser, auth.createToken, user.login);
router.get('/api/user/profile', userTokenMW.loadUserToken, user.profile);

router.get('/api/event', userTokenMW.loadUserToken, event.getEvents);

router.post('/api/ride', userTokenMW.loadUserToken, ride.create);
router.get('/api/ride', userTokenMW.loadUserToken, ride.getRides);
//router.get('/api/ride/:id', ride.getRide);

router.get('/webhook', webhook.testje);
router.post('/webhook', webhook.addEvent);


router.get('/api/*', showError.notFound);

module.exports = router;
