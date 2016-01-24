'use strict';

var angular = require('angular');
require('angular-ui-router');
require('angular-animate');

angular.module('app', [
	'ui.router',
	require('angular-animate'),
]);

// Services
require('./auth/Auth_service');
require('./users/User_service');
require('./bans/Ban_service');
require('./servers/Server_service');

require('./interceptors');
require('./filter');
require('./directives');
require('./routes');

require('./main');
require('./auth');
require('./servers');
require('./bans');
require('./users');
require('./logs');
