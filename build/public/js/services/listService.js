
'use strict';

define(['services/serviceModule'], function (serviceModule) {

	serviceModule.factory('userDetailsService', ['$resource', function (resource) {

		return resource('/user/usersList');
	}]);

	serviceModule.factory('userTypeService', ['$resource', function (resource) {

		return resource('/user/userTypes');
	}]);

	/*
 angular.module('myApp.services').factory('Entry', function($resource) {
  		return $resource('/api/entries/:id'); // Note the full endpoint address
 }); 
 */
});
//# sourceMappingURL=listService.js.map
