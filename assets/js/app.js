var angular = require('angular');
require('angular-ui-router');
require('angular-animate');

var app = angular.module('app', [
	'ui.router',
	require('angular-animate'),
]);

// Services
require('./auth/Auth_service');
require('./users/User_service');
require('./bans/Ban_service');
require('./servers/Server_service');

require('./filter');
require('./main');
require('./routes');
require('./auth');
