var View = require('./view');

/**
 * Renders the home page
 */
exports.home = function(req, res) {
  var view = new View(req, res);

  view.locals.section = 'home';
  view.locals.title = 'Home';

  view.render('index');
};
