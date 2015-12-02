var express = require('express');
var router = express.Router();

var index = require('./endpoints/index');
var api = require('./endpoints/api');
var user = require('./endpoints/user');
var event = require('./endpoints/event');

router.get('/', index.home);
router.get('/api/ping', api.ping);
router.post('/user/login', user.login);
router.get('/user/profile', user.profile);
router.post('/event/save', event.save);
router.get('/event', event.getEvents);
router.get('/api/*', api.notFound);


module.exports = router;
