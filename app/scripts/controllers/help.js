'use strict';

/**
 * @ngdoc function
 * @name lighthouseDashboardApp.controller:HelpCtrl
 * @description
 * # HelpCtrl
 * Controller of the lighthouseDashboardApp
 */
angular.module('lighthouseDashboardApp')
    .controller('HelpCtrl', function ($scope, MessageFactory, NgMap, fbURL) {

        $scope.init = function () {
            var ref = new Firebase(fbURL);
            $scope.user = ref.getAuth();
            if ($scope.user) {
                $scope.messageSending = true;
                MessageFactory.getMessageForUser($scope.user, function (message) {
                    $scope.confirmSentMessage(message);
                    $scope.messageSending = false;
                });
            } else {
                ref.authAnonymously(function (error, authData) {
                    $scope.user = authData;
                }, {});
            }
        };

        $scope.message = '';
        $scope.messageSent = false;
        $scope.messageSending = false;

        $scope.sendAlert = function () {
            $scope.messageSending = true;
            var onSuccess = function (position) {
                MessageFactory.newMessage(position, $scope.user)
                    .then(function (ref) {
                        $scope.confirmSentMessage(MessageFactory.getMessage(ref));
                    });
            };

            // onError Callback receives a PositionError object
            //
            function onError(error) {
                console.log('code: ' + error.code + '\n' +
                    'message: ' + error.message + '\n');
            }
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
        };

        $scope.confirmSentMessage = function (message) {
            if (message != null) {
                $scope.message = message;
                $scope.messageSent = true;
            }
            $scope.messageSending = false;
        };

        $scope.init();
    });
