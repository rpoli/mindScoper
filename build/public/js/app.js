/*global define*/
'use strict';

define(['angular', 'uiRouter', 'angularRoute', 'services/serviceLoader', 'controllers/controllerLoader', 'angularAnimate', 'angularResource', 'ngDialog'], function (angular) {
    var app = angular.module('CDS', ['ngRoute', 'serviceModule', "controllerModule", 'ngAnimate', 'ngResource', 'ui.router', 'ngDialog']);
    return app;
});
//# sourceMappingURL=app.js.map
