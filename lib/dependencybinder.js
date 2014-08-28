'use strict';

var DependencyBinder = function(dependencyItemBuilder) {
  this.dependencyItemBuilder = dependencyItemBuilder;
};

var bind = function(item, dependencies, scope) {
  if(!item) {
    throw 'Parameter "item" cannot be null or undefined';
  }

  scope = validateScope(scope);

  var injectorItem = this.dependencyItemBuilder.buildInjectorItem(item, dependencies, scope);

  var injectorItems = getInjectorItemsByScope(scope);
  injectorItems.push(item);
};

var getChildInjectorItems = function() {
  initInjectorItems();

  return global.dependencyInjectorItems.childInjectorItems;
};

var getParentInjectorItems = function() {
  initInjectorItems();

  return global.dependencyInjectorItems.parentInjectorItems;
};

var getInjectorItemsByScope = function(scope) {
  switch(scope) {
    case 'singleton':
    case 'transient':
      return getParentInjectorItems();
    default:
      return getChildInjectorItems();
  }
};

var initInjectorItems = function() {
  if(!global.dependencyInjectorItems) {
    global.dependencyInjectorItems = {};
    global.dependencyInjectorItems.parentInjectorItems = [];
    global.dependencyInjectorItems.childInjectorItems = [];
  }
};

var validateScope = function(scope) {
  if(!scope) {
    throw 'Dependency scope cannot be null or undefined. Valid scope types are "singleton", "webrequest", and "transient".';
  }

  var scopeLower = scope.toLowerCase();

  switch(scopeLower) {
    case 'singleton':
    case 'webrequest':
    case 'transient':
      return scopeLower;
    default:
      throw 'Invalid dependency scope. Valid scope types are "singleton", "webrequest", and "transient".';
  }
};

DependencyBinder.prototype = {
  bind: bind,
  childInjectorItems: getChildInjectorItems,
  parentInjectorItems: getParentInjectorItems
};

module.exports = DependencyBinder;
