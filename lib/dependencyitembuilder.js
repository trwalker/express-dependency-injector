'use strict';

var DependencyItemBuilder = function(di) {
  this.di = di;
};

var buildInjectorItem = function(item, dependencies) {
  if(!item) {
    throw 'Parameter "item" cannot be null or undefined';
  }
  else {
    if(dependencies && dependencies.length > 0) {
      var inject = new this.di.Inject();

      var dependenciesLength = dependencies.length;
      for(var i = 0; i < dependenciesLength; i++) {
        inject.tokens.push(dependencies[i]);
      }

      this.di.annotate(item, inject);
    }
  }

  return item;
};

DependencyItemBuilder.prototype = {
  buildInjectorItem: buildInjectorItem
};

module.exports = DependencyItemBuilder;
