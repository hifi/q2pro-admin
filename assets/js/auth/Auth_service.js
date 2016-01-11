var angular = require('angular');
var app = angular.module('app');

app.service(['$http', function($http) {
	var self = this;

	self.login = function(username, password) {
		return $http.post('api.php', {
			username: username,
			password: password,
		});
	};

}]);
