'use strict';

module.exports = ['AuthService', '$state', function(AuthService, $state) {
	AuthService.logout()
	.finally(function() {
		$state.go('login');
	});
}];
