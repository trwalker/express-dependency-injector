'use strict';

var DependencyBinderItem = function(item, dependencies) {
	this.item = item;
	this.dependencies = dependencies;
};

module.exports = DependencyBinderItem;
