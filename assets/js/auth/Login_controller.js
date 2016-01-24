
module.exports = [
'AuthService', '$http', '$scope',
function(AuthService, $http, $scope) {
	$scope.username = '';
	$scope.password = '';

	$scope.auth = function() {
		Loader.start();
		AuthService.auth();
	};
}];
