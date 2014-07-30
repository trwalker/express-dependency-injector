'use strict';

module.exports = function() {
  return (function() {

    function bind(item, dependencies, scope) {
      validateScope(scope);

      if(!global.dependencyBinderItems) {
        global.dependencyBinderItems = {};
      }

      var binderItems = global.dependencyBinderItems[scope];

      if(!binderItems) {
        global.dependencyBinderItems[scope] = [];
        binderItems = [];
      }

      var dependencyBinderItem = require('./dependencybinderitem')(item, dependencies);
      binderItems.push(dependencyBinderItem);

      global.dependencyBinderItems[scope] = binderItems;
    }

    function get(scope) {
      if(!global.dependencyBinderItems) {
        global.dependencyBinderItems = {};
        global.dependencyBinderItems[scope] = [];
      }

      return global.dependencyBinderItems[scope];
    }

    function validateScope(scope) {
      var scopeLower = scope.toLowerCase();
      if(scopeLower !== 'singleton' &&
         scopeLower !== 'webrequest' &&
         scopeLower !== 'transient') {
        throw 'Invalid dependency scope. Valid scope types are "signleton", "webrequest", and "transient".';
      }
    }

    return {
      bind: bind,
      get: get
    };

  })();
};
