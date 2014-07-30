'use strict';

module.exports = function(item, dependencies) {
	return (function(item, dependencies) {

		return {
			item: item,
			dependencies: dependencies || []
		};

	})(item, dependencies);
};
