'use strict';

/**
 * @ngdoc function
 * @name lighthouseDashboardApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the lighthouseDashboardApp
 */
angular.module('lighthouseDashboardApp')
    .controller('DashboardCtrl', function ($scope, MessageFactory, NgMap) {

        // Inject message factory in scope.
        $scope.messages = MessageFactory.messages;

        $scope.acknowledgeMessage = function (message) {
            MessageFactory.acknowledgeMessage(message);
        };
    });
