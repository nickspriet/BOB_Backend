var async = require('async');
var _ = require('lodash');
var moment = require('moment');

function View(req, res, next) {
  if (!req) throw new Error('View requires an express request object');
  if (!res) throw new Error('View requires an express response object');

  this.req = req;
  this.res = res;
  this.next = next;
  this.user = req.user;
  this.locals = res.locals;
  this.locals.user = this.user;

  this.locals._ = _;
  this.locals.moment = moment;

  this.initQueue = [];
}

View.prototype.on = function(type, cb) {
  if (type === 'init') {
    this.initQueue.push(cb);
  }
  return this;
};

View.prototype.render = function(templatePath) {
  var res = this.res;
  var view = this;

  async.eachSeries(this.initQueue, function(i, next) {
    i(view, next);
  }, function(err) {
    if (err) console.error(err);
    res.render(templatePath);
  });
};

module.exports = View;
