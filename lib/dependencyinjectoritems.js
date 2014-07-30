'use strict';

module.exports = function(di, dependencyBinder) {
  return (function(di, dependencyBinder) {

    var di = di;
    var dependencyBinder = dependencyBinder;

    function get(scope) {

      var injectorItems = getCachedItems(scope);

      if(!injectorItems) {
        injectorItems = buildItems(scope);
        setCachedItems(scope, injectorItems);
      }

      return injectorItems;
    }

    function getCachedItems(scope) {
      if(!global.dependencyInjectorItems) {
        global.dependencyInjectorItems = {};
      }

      return global.dependencyInjectorItems[scope];
    }

    function setCachedItems(scope, items) {
      if(!global.dependencyInjectorItems) {
        global.dependencyInjectorItems = {};
      }

      global.dependencyInjectorItems[scope] = items;
    }

    function buildItems(scope) {
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
    }

    return {
      get: get
    };

  })(di, dependencyBinder);
};
