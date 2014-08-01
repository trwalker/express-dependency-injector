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

  var DependencyBinderItem = require('./dependencybinderitem');
  var dependencyBinderItem = new DependencyBinderItem(item, dependencies);

  binderItems.push(dependencyBinderItem);

  global.dependencyBinderItems[scope] = binderItems;
};

var get = function(scope) {
  if(!global.dependencyBinderItems) {
    global.dependencyBinderItems = {};
    global.dependencyBinderItems[scope] = [];
  }

  return global.dependencyBinderItems[scope];
};



var validateScope = function(scope) {
  var scopeLower = scope.toLowerCase();
  if(scopeLower !== 'singleton' &&
     scopeLower !== 'webrequest' &&
     scopeLower !== 'transient') {
    throw 'Invalid dependency scope. Valid scope types are "signleton", "webrequest", and "transient".';
  }
};

DependencyBinder.prototype = {
  bind: bind,
  get: get
};

module.exports = DependencyBinder;
