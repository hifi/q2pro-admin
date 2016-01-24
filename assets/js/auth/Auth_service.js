'use strict';

var angular = require('angular');
var app = angular.module('app');

app.service('AuthService',
['$http', '$q', '$rootScope',
function($http, $q, $rootScope) {
	var self = this;

	self.login = function(username, password) {
		return $http.post('api.php', {
			method: 'login',
			username: username,
			password: password,
		})
		.then(function(user) {
			localStorage.user = JSON.stringify(user);
			$rootScope.user = user;
		});
	};

	self.logout = function() {
		return $http.post('api.php', {
			method: 'logout',
		})
		.finally(function() {
			// Delete user from localstorage
			delete localStorage.user;
			delete $rootScope.user;
		});
	};

	self.getUser = function() {
		var user = null;
		try {
			user = JSON.parse(localStorage.user);
		}
		catch (e) {
			return null;
		}

		return user || null;
	};

}]);
