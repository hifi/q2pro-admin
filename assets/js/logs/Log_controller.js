'use strict';

module.exports = ['$http', '$scope', function($http, $scope) {
	$scope.servers = [];

	$http.post('api.php', {
		method: 'servers',

	})
	.then(function(data) {
		$scope.servers = data.servers;
	});
}];
