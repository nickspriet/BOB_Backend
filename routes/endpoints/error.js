/**
 * Created by Nick on 12/30/15.
 */


var errResponse = function (res) {
    return function (err, msg) {
        console.error(err);
        res.status(500);
        return res.send({
            statusCode: 500,
            message: msg,
            error: err
        });
    };
};

module.exports = errResponse;