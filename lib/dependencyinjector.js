'use strict';

var DependencyInjector = function(di, dependencyBinder) {
  this.di = di;
  this.dependencyBinder = dependencyBinder;
};

var initializeInjectors = function(req) {
  if(!req) {
    throw 'Express request object must be passed to initialize() and cannot be null or undefined';
  }

  if(!global.dependencyInjector) {
    var singletonInjectorItems = this.dependencyBinder.get('singleton');
    global.dependencyInjector = new this.di.Injector(singletonInjectorItems);
  }

  var webRequestInjectorItems = this.dependencyBinder.get('webrequest');
  req.dependencyInjector = global.dependencyInjector.createChild(webRequestInjectorItems)
};


DependencyInjector.prototype = {
  initialize: initializeInjectors
};

module.exports = DependencyInjector;
