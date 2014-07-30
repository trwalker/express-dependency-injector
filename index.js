'use strict';

module.exports = function(application) {
return (function(application) {

    var di = require('di');

    var dependencyBinder = require('./lib/dependencybinder')(application);
    var dependencyInjectorItems = require('./lib/dependencyinjectoritems')(di, dependencyBinder);
    var dependencyInjector = require('./lib/dependencyinjector')(di, dependencyInjectorItems);

    application.bind = dependencyBinder.bind;

    application.use(function(req, res, next){
      dependencyInjector.initialize(req);
      next();
    });

  })(application);
};
