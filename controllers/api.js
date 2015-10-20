var _ = require('lodash');

/**
 * Returns a 404 error message
 */
exports.notFound = function(req, res) {
  res.status(404);
  res.send({
    statusCode: 404,
    message: 'Not Found'
  });
};

/**
 * Returns the parameters and query for the request
 */
exports.ping = function(req, res) {
  var params = _.merge(req.query, req.params);

  res.send({
    statusCode: 200,
    message: 'OK',
    query: params
  });
};
