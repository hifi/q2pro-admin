var angular = require('angular');


var app = angular.module('app');

app.service('Loader', ['$rootScope', function($rootScope) {
	self.start = function() {
		$rootScope.loader = true;
	};
	self.stop = function() {
		$rootScope.loader = false;
	};
}]);
