'use strict';

/**
 * @ngdoc overview
 * @name lighthouseDashboardApp
 * @description
 * # lighthouseDashboardApp
 *
 * Main module of the application.
 */
angular
    .module('lighthouseDashboardApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase',
    'ngMap'
  ])
    .value('messageURL', 'https://sizzling-inferno-4233.firebaseio.com/')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/dashboard', {
                templateUrl: 'views/dashboard.html',
                controller: 'DashboardCtrl',
                controllerAs: 'dashboard'
            })
            .when('/', {
                templateUrl: 'views/help.html',
                controller: 'HelpCtrl',
                controllerAs: 'help'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
