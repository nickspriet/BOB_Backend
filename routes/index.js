var express = require('express');
var router = express.Router();

var index = require('../controllers/index');
var api = require('../controllers/api');

router.get('/', index.home);
router.get('/api/ping', api.ping);
router.get('/api/*', api.notFound);


module.exports = router;
