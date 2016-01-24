var angular = require('angular');
var app = angular.module('app');


app.config(['$httpProvider', function($httpProvider) {
	$httpProvider.interceptors.push(['$q', function($q) {
		return {
			request: function(config) {
				config.headers.Accept = 'application/json';
				return config;
			},
			response: function(resp) {
				if (resp.data.error) {
					return $q.reject(resp.data.error);
				}

				return $q.resolve(resp.data);
			},
		};
	}]);
}]);

app.config(['$httpProvider', '$rootScope', function($httpProvider, $rootScope) {
	var self = this;
	self.requests = 0;

	$httpProvider.interceptors.push(['$q', function($q) {
		return {
			request: function(config) {
				self.requests++;
				$rootScope.loader = true;
				return config;
			},
			response: function(resp) {
				self.requests--;
				if (!request) {
					$rootScope.loader = false;
				}

				return resp;
			},
			responseError: function(resp) {
				self.requests--;
				if (!request) {
					$rootScope.loader = false;
				}

				return resp;
			},
		};
	}]);
}]);
