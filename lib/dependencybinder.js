'use strict';

var DependencyBinder = function() {
};

var bind = function(item, dependencies, scope) {
  validateScope(scope);

  if(!global.dependencyBinderItems) {
    global.dependencyBinderItems = {};
  }

  var binderItems = global.dependencyBinderItems[scope];

  if(!binderItems) {
    global.dependencyBinderItems[scope] = [];
    binderItems = [];
  }

  if(!item) {
    throw 'Dependency item cannot be null or undefined';
  }

  if(!dependencies) {
    dependencies = [];
  }

  var DependencyBinderItem = require('./dependencybinderitem');
  var dependencyBinderItem = new DependencyBinderItem(item, dependencies);

  binderItems.push(dependencyBinderItem);

  global.dependencyBinderItems[scope] = binderItems;
};

var get = function(scope) {
  validateScope(scope);

  if(!global.dependencyBinderItems) {
    global.dependencyBinderItems = {};
    global.dependencyBinderItems[scope] = [];
  }

  return global.dependencyBinderItems[scope];
};

var clear = function() {
  global.dependencyBinderItems = null;
};

var validateScope = function(scope) {
  if(!scope) {
    throw 'Dependency scope cannot be null or undefined. Valid scope types are "signleton", "webrequest", and "transient".';
  }

  var scopeLower = scope.toLowerCase();
  if(scopeLower !== 'singleton' &&
     scopeLower !== 'webrequest' &&
     scopeLower !== 'transient') {
    throw 'Invalid dependency scope. Valid scope types are "signleton", "webrequest", and "transient".';
  }
};

DependencyBinder.prototype = {
  bind: bind,
  get: get,
  clear: clear
};

module.exports = DependencyBinder;
