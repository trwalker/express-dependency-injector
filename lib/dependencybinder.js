'use strict';

var DependencyBinder = function(dependencyItemBuilder) {
  this.dependencyItemBuilder = dependencyItemBuilder;
};

var bind = function(item, dependencies, scope) {
  if(!item) {
    throw 'Parameter "item" cannot be null or undefined';
  }

  validateScope(scope);

  var injectorItem = this.dependencyItemBuilder.buildInjectorItem(item, dependencies, scope);

  addInjectorItem(injectorItem, scope);
};

var get = function(scope) {
  validateScope(scope);

  initInjectorItems(scope);

  return global.dependencyInjectorItems[scope];
};

var clear = function() {
  global.dependencyInjectorItems = null;
};

var addInjectorItem = function(item, scope) {
  initInjectorItems(scope);

  global.dependencyInjectorItems[scope].push(item);
};

var initInjectorItems = function(scope) {
  if(!global.dependencyInjectorItems) {
    global.dependencyInjectorItems = {};
  }

  if(!global.dependencyInjectorItems[scope]) {
    global.dependencyInjectorItems[scope] = [];
  }
};

var validateScope = function(scope) {
  if(!scope) {
    throw 'Dependency scope cannot be null or undefined. Valid scope types are "singleton", "webrequest", and "transient".';
  }

  var scopeLower = scope.toLowerCase();
  if(scopeLower !== 'singleton' &&
     scopeLower !== 'webrequest' &&
     scopeLower !== 'transient') {
    throw 'Invalid dependency scope. Valid scope types are "singleton", "webrequest", and "transient".';
  }
};

DependencyBinder.prototype = {
  bind: bind,
  get: get,
  clear: clear
};

module.exports = DependencyBinder;
