module.exports = ['AuthService', '$state', function(AuthService, $state) {
	AuthService.logout()
	.then(function() {
		$state.go('login');
	});
}];
