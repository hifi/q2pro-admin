'use strict';

var angular = require('angular');
var app = angular.module('app');

app.service('ServerService', ['$http', function($http) {
	var self = this;

	self.listServers = function() {
		return $http.post('api.php', {
			method: 'serverList',
		});
	};

	self.deleteServer = function(id) {
		return $http.post('api.php', {
			method: 'serverDelete',
			id: id,
		});
	};
}]);
