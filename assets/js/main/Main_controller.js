'use strict';

module.exports = ['$rootScope', 'AuthService', function($rootScope, AuthService) {
	$rootScope.baseTitle = $rootScope.title;
	$rootScope.user = AuthService.getUser();
}];
