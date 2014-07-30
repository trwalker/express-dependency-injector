'use strict';

module.exports = function(di, dependencyInjectorItems) {
  return (function(di, dependencyInjectorItems) {

    var di = di;
    var dependencyInjectorItems = dependencyInjectorItems;

    function initializeInjectors(req) {

      if(!global.dependencyInjector) {
        
        var singletonInjectorItems = dependencyInjectorItems.get('singleton');

        global.dependencyInjector = new di.Injector(singletonInjectorItems);
      }

      var webRequestInjectorItems = dependencyInjectorItems.get('webrequest');

      req.dependencyInjector = global.dependencyInjector.createChild(webRequestInjectorItems)
    }

    return {
      initialize: initializeInjectors
    };

  })(di, dependencyInjectorItems);
};
