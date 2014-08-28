'use strict';

module.exports = function(application) {

  var di = require('di');

  var DependencyItemBuilder = require('./lib/dependencyitembuilder');
  var dependencyItemBuilder = new DependencyItemBuilder(di);

  var DependencyBinder = require('./lib/dependencybinder');
  var dependencyBinder = new DependencyBinder(dependencyItemBuilder);

  var DependencyInjector = require('./lib/dependencyinjector');
  var dependencyInjector = new DependencyInjector(di, dependencyBinder);

  application.bind = function(item, dependencies, scope) {
    dependencyBinder.bind(item, dependencies, scope);
  };

  application.use(function(req, res, next){
    dependencyInjector.initialize(req);
    next();
  });

};
