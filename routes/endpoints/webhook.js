/**
 * Created by Nick Spriet on 09/12/2015.
 */

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
    console.log("request fb:", req);
    console.log("response fb:", res);
};
