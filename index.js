'use strict';

module.exports = function(application) {

  var di = require('di');

  var DependencyBinder = require('./lib/dependencybinder');
  var dependencyBinder = new DependencyBinder(application);

  var DependencyInjectorItems = require('./lib/dependencyinjectoritems');
  var dependencyInjectorItems = new DependencyInjectorItems(di, dependencyBinder);

  var DependencyInjector = require('./lib/dependencyinjector');
  var dependencyInjector = new DependencyInjector(di, dependencyInjectorItems);

  application.bind = dependencyBinder.bind;

  application.use(function(req, res, next){
    dependencyInjector.initialize(req);
    next();
  });

};
