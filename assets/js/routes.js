'use strict';

var angular = require('angular');
var app = angular.module('app');

app.config(['$stateProvider', '$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/login');

	$stateProvider
	.state('login', {
		url: '/login',
		views: {
			header: { template: '', },
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
	.state('servers', {
		url: '/servers',
		views: {
			header: { templateUrl: 'partial/header.html', },
			main: { templateUrl: 'servers/index.html', }
		},
	})
	.state('server', {
		url: '/server/:id',
		views: {
			header: { templateUrl: 'partial/header.html', },
			main: { templateUrl: 'servers/single.html', }
		},
	})
	.state('bans', {
		url: '/bans',
		views: {
			header: { templateUrl: 'partial/header.html', },
			main: { templateUrl: 'bans/index.html', }
		},
	})
	.state('users', {
		url: '/users',
		views: {
			header: { templateUrl: 'partial/header.html', },
			main: { templateUrl: 'users/index.html', }
		},
		superAdminOnly: true,
	})
	.state('passwordReset', {
		url: '/pwreset',
		views: {
			header: { templateUrl: 'partial/header.html', },
			main: { templateUrl: 'users/pwreset.html', }
		},
	})
	.state('logs', {
		url: '/logs',
		views: {
			header: { templateUrl: 'partial/header.html', },
			main: { templateUrl: 'logs/index.html', }
		},
	});
}]);
