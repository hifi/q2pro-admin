'use strict';

var angular = require('angular');
var app = angular.module('app');

/**
 * Sets some variables to false
 * @param  $rootScope AngularJS $rootScope
 */
app.run(['$rootScope', function($rootScope) {
	// Disable remodal windows
	$rootScope.loader = false;
}]);

// Create a factory for interceptor
app.factory('loaderHttpInterceptor',
['$rootScope', '$q', function($rootScope, $q) {
	var self = this;
	self.requestCount = 0;

	return {
		request: function(config) {
			self.requestCount++;
			$rootScope.loader = true;
			return config;
		},
		response: function(resp) {
			self.requestCount--;
			if (self.requestCount === 0) {
				$rootScope.loader = false;
			}

			return resp;
		},
		responseError: function(resp) {
			self.requestCount--;
			if (self.requestCount === 0) {
				$rootScope.loader = false;
			}

			return $q.reject(resp);
		},
	};
}]);

app.factory('ajaxHttpInterceptor',
['$q', '$rootScope', function($q, $rootScope) {
	return {
		request: function(config) {
			if (angular.isObject(config.data)) {
				config.headers.Accept = 'application/json';
				config.headers['Content-Type'] = 'application/json';
				config.headers['X-Requested-With'] = 'XMLHttpRequest';
				if ($rootScope.user) {
					config.data.sessionId = $rootScope.user.sessionId;
				}
			}

			return config;
		},
		response: function(resp) {
			if (!resp.data || !angular.isObject(resp.data)) {
				return $q.resolve(resp);
			}

			// Reject all responses with 'error' field set
			if (resp.data.error) {
				return $q.reject(resp.data.error);
			}

			return $q.resolve(resp.data.data);
		},
	};
}]);


app.config(['$httpProvider', function($httpProvider) {
	$httpProvider.interceptors.push('ajaxHttpInterceptor');
	$httpProvider.interceptors.push('loaderHttpInterceptor');
}]);
