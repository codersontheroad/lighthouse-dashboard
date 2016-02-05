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

        $scope.acknowledgeMessage = MessageFactory.acknowledgeMessage;

        $scope.deleteMessage = MessageFactory.deleteMessage;

        $scope.activeMessageId = '';

        $scope.centerMap = function (message) {
            $scope.activeMessageId = message.$id;
            NgMap.getMap().then(function (map) {
                map.setCenter({lat:message.latitude, lng:message.longitude});
            });
        };

        $scope.getPosition = function (message) {
            return '[' + message.latitude + ',' + message.longitude + ']';
        };
    });
