/**
 * Created by Nick Spriet on 09/12/2015.
 */
var async = require('async');

//TODO: export keys to config file
exports.testje = function (req, res) {
    res.send(req.param('hub.challenge'));

    if (req.param('hub.mode') == 'subscribe' && req.param('hub.verify_token') == 'test') {
        console.log("if");
        console.log(req.param('hub.challenge'));
        res.send(req.param('hub.challenge'));
    }
    else {
        console.log("else");
        res.send(400);
    }
};


exports.addEvent = function (req, res) {
    var userId = req.body.entry[0].id;
    var changedFields = req.body.entry[0].changed_fields;

    async.forEach(changedFields, function (item, cb) {
        switch (item) {
            case 'events':
            //update events for user with userId
        }

        // tell async that the iterator has completed
        cb();

    }, function (err) {
        console.log('iterating done');
    });

};
