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
            .when('/', {
                templateUrl: 'views/dashboard.html',
                controller: 'DashboardCtrl',
                controllerAs: 'dashboard'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
