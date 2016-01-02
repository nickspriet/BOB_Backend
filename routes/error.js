/**
 * Created by Nick on 12/30/15.
 */

var showError = (function () {
    //Returns a 500 error message
    var response = function (res) {
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

    //Returns a 404 error message
    var notFound = function (req, res) {
        res.status(404);
        res.send({
            statusCode: 404,
            message: 'Not Found'
        });
    };

    return {
        response: response,
        notFound: notFound
    }

})();

module.exports = showError;