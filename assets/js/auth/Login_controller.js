'use strict';

module.exports = [
'AuthService', '$http', '$scope', '$state',
function(AuthService, $http, $scope, $state) {
	$scope.username = '';
	$scope.password = '';

	if (AuthService.getUser()) {
		$state.go('servers');
	}

	$scope.login = function() {
		$scope.error = '';
		AuthService.login($scope.username, $scope.password)
		.then(function() {
			$state.go('servers');
		})
		.catch(function(err) {
			$scope.error = err;
		});
	};
}];
