'use strict';

var DependencyInjector = function(di, dependencyInjectorItems) {
  this.di = di;
  this.dependencyInjectorItems = dependencyInjectorItems;
};

var initializeInjectors = function(req) {
  if(!req) {
    throw 'Express request object must be passed to initialize() and cannot be null or undefined';
  }

  if(!global.dependencyInjector) {
    var singletonInjectorItems = this.dependencyInjectorItems.get('singleton');
    global.dependencyInjector = new this.di.Injector(singletonInjectorItems);
  }

  var webRequestInjectorItems = this.dependencyInjectorItems.get('webrequest');
  req.dependencyInjector = global.dependencyInjector.createChild(webRequestInjectorItems)
};


DependencyInjector.prototype = {
  initialize: initializeInjectors
};

module.exports = DependencyInjector;
