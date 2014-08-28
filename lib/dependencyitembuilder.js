'use strict';

var DependencyItemBuilder = function(di) {
  this.di = di;
};

var buildInjectorItem = function(item, dependencies, scope) {
  if(!item) {
    throw 'Parameter "item" cannot be null or undefined';
  }
  else {
    if(dependencies && dependencies.length > 0) {
      annotateWithInject(this.di, item, dependencies);
    }

    if(scope == 'transient') {
      annotateWithTransient(this.di, item);
    }
  }

  return item;
};

var annotateWithInject = function(di, item, dependencies) {
  var inject = new di.Inject();

  var dependenciesLength = dependencies.length;
  for(var i = 0; i < dependenciesLength; i++) {
    inject.tokens.push(dependencies[i]);
  }

  di.annotate(item, inject);
};

var annotateWithTransient = function(di, item) {
  di.annotate(item, new di.TransientScope());
};

DependencyItemBuilder.prototype = {
  buildInjectorItem: buildInjectorItem
};

module.exports = DependencyItemBuilder;
