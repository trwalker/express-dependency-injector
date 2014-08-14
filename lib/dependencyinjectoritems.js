'use strict';

var DependencyInjectorItems = function(di, dependencyBinder) {
  this.di = di;
  this.dependencyBinder = dependencyBinder;
};

var get = function(scope) {
  var injectorItems = getCachedItems(scope);

  if(!injectorItems) {
    injectorItems = buildItems(this.di, this.dependencyBinder, scope);
    setCachedItems(scope, injectorItems);
  }

  return injectorItems;
};

var getCachedItems = function(scope) {
  if(!global.dependencyInjectorItems) {
    global.dependencyInjectorItems = {};
  }

  if(scope) {
    return global.dependencyInjectorItems[scope];
  }
  else {
    return null;
  }
};

var setCachedItems = function(scope, items) {
  if(!global.dependencyInjectorItems) {
    global.dependencyInjectorItems = {};
  }

  global.dependencyInjectorItems[scope] = items;
};

var buildItems = function(di, dependencyBinder, scope) {
  var injectorItems = [];
  var binderItems = dependencyBinder.get(scope);

  if(binderItems) {
    var binderItemsLength = binderItems.length;
    for(var i = 0; i < binderItemsLength; i++) {

      var dependencyItem = binderItems[i];

      var dependencies = dependencyItem.dependencies;
      var dependenciesLength = dependencies.length;

      if(dependenciesLength > 0) {
        var inject = new di.Inject();

        for(var k = 0; k < dependenciesLength; k++) {
          inject.tokens.push(dependencies[k]);
        }

        di.annotate(dependencyItem.item, inject);
      }

      injectorItems.push(dependencyItem.item);
    }
  }

  return injectorItems;
};

DependencyInjectorItems.prototype = {
  get: get
};

module.exports = DependencyInjectorItems;
