var express = require('express');
var router = express.Router();

var index = require('./endpoints/index');
var api = require('./endpoints/api');
var user = require('./endpoints/user');

router.get('/', index.home);
router.get('/api/ping', api.ping);
router.post('/user/login', user.login);
router.get('/user/profile', user.profile);
router.get('/api/*', api.notFound);


module.exports = router;
