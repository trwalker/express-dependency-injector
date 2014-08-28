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
    var parentInjectorItems = this.dependencyBinder.parentInjectorItems();
    global.dependencyInjector = new this.di.Injector(parentInjectorItems);
  }

  var childInjectorItems = this.dependencyBinder.childInjectorItems();
  req.dependencyInjector = global.dependencyInjector.createChild(childInjectorItems);
};


DependencyInjector.prototype = {
  initialize: initializeInjectors
};

module.exports = DependencyInjector;
