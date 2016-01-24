'use strict';

module.exports = ['ServerService', '$http', '$scope', function(ServerService, $http, $scope) {
	$scope.servers = [];

	function initServers() {
		ServerService.listServers()
		.then(function(servers) {
			$scope.servers = servers;
		});
	}

	initServers();

	$scope.delete = function(id) {
		ServerService.deleteServer(id)
		.then(initServers)
		.catch(function(err) {
			$scope.error = err;
		});
	};
}];
