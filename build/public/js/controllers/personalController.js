'use strict';

define(['controllers/controllerModule'], function (controllerModule) {

    controllerModule.controller('personalController', ['$http', function ($http) {
        this.msg = "personal information";

        this.save = function () {
            $http.post('/cdsUserSave', {
                msg: 'hello word!'
            }).success(function (data, status, headers, config) {}).error(function (data, status, headers, config) {});
        };
    }]);
});
//# sourceMappingURL=personalController.js.map
