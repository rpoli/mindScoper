/*global define*/
'use strict';

define(['app', 'uiRouter', 'angularRoute'], function (app) {

    app.config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider.state('root', {
            abstract: true,
            url: "",
            views: {
                'header': {
                    templateUrl: 'views/common/header.html'
                },
                'footer': {
                    templateUrl: 'views/common/footer.html'
                }
            }
        }).state('root.home', {
            url: '/',
            views: {
                'content@': {
                    templateUrl: 'views/home/home.html'
                }
            }
        }).state('root.register', {
            url: '/register',
            views: {
                'content@': {
                    templateUrl: 'views/register/register.html',
                    controller: "leftNavController as leftNavCtrl"
                }
            }
        }).state('root.register.personal', {
            url: '/personal',
            views: {
                'formSubsection': {
                    templateUrl: 'views/register/subsection/personal.html',
                    controller: "personalController as personalCtrl"
                }
            }
        }).state('root.register.voter', {
            url: '/voter',
            views: {
                'formSubsection': {
                    templateUrl: 'views/register/subsection/voter.html',
                    controller: "voterController as voterCtrl"
                }
            }
        }).state('root.register.address', {
            url: '/address',
            views: {
                'formSubsection': {
                    templateUrl: 'views/register/subsection/address.html',
                    controller: "addressController as addressCtrl"
                }
            }
        }).state('root.register.volunteer', {
            url: '/volunteer',
            views: {
                'formSubsection': {
                    templateUrl: 'views/register/subsection/volunteer.html',
                    controller: "volunteerController as volunteerCtrl"
                }
            }
        }).state('root.register.family', {
            url: '/family',
            views: {
                'formSubsection': {
                    templateUrl: 'views/register/subsection/family.html',
                    controller: "familyController as familyCtrl"
                }
            }
        }).state('root.register.cadre', {
            url: '/cadre',
            views: {
                'formSubsection': {
                    templateUrl: 'views/register/subsection/cadre.html',
                    controller: "cadreController as cadreCtrl"
                }
            }
        }).state('root.list', {
            url: '/list',
            views: {
                'content@': {
                    templateUrl: 'views/list/list.html',
                    controller: "listController as listCtrl"
                }
            }

        });
    });
});
//# sourceMappingURL=config.js.map
