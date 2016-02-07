'use strict';

/**
 * @ngdoc function
 * @name lighthouseDashboardApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the lighthouseDashboardApp
 */
angular.module('lighthouseDashboardApp')
    .controller('HelpCtrl', function ($scope, MessageFactory, NgMap) {

        $scope.message = '';
        $scope.messageSent = false;
        $scope.messageSending = false;

        $scope.sendAlert = function () {
            $scope.messageSending = true;
            var onSuccess = function (position) {
                MessageFactory.newMessage(position, $scope.message)
                    .then(function(ref) {
                    $scope.message = MessageFactory.getMessage(ref);
                    $scope.messageSent = true;
                    $scope.messageSending = false;
                });
            };

            // onError Callback receives a PositionError object
            //
            function onError(error) {
                console.log('code: ' + error.code + '\n' +
                    'message: ' + error.message + '\n');
            }
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
        }
    });
