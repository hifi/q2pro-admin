var angular = require('angular');
var app = angular.module('app');
app.config(['$stateProvider', '$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/login');

	$stateProvider
	.state('login', {
		url: '/login',
		views: {
			header: { templateUrl: 'partial/header.html', },
			main: { templateUrl: 'auth/login.html', }
		},
	})
	.state('logout', {
		url: '/logout',
		views: {
			header: { template: '', },
			main: { template: '', controller: require('./auth/Logout_controller'), }
		},
	})
	.state('info', {
		url: '/info',
		views: {
			header: { template: '', },
			main: { templateUrl: 'servers/index.html', }
		},
	});
}]);
