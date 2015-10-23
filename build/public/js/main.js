/*global require*/
'use strict';

require.config({
	baseUrl: "js",
	paths: {
		"app": "app",
		"config": "config",
		"angular": 'lib/angular',
		'angularRoute': 'lib/angular-route',
		'angularAnimate': 'lib/angular-animate',
		'angularResource': 'lib/angular-resource',
		"services": "services",
		"controllers": "controllers",
		"uiRouter": "lib/angular-ui-router",
		"jquery": "lib/min/jquery-1.11.2.min",
		"underscore": "lib/min/underscore-min",
		"ngDialog": "lib/ngDialog"
	},
	shim: {
		angular: {
			exports: 'angular'
		},
		'angularAnimate': {
			exports: 'angular-animate',
			deps: ['angular']
		},
		'angularResource': {
			exports: 'resource',
			deps: ['angular']
		},
		'angularRoute': {
			deps: ['angular']
		},
		'uiRouter': {
			deps: ['angular']
		},
		'underscore': {
			exports: '_'
		},
		'ngDialog': {
			deps: ['angular']
		}
	}
});
require(['angular', 'app', "config"], function (angular) {
	angular.bootstrap(document, ['CDS']);
});
//# sourceMappingURL=main.js.map
