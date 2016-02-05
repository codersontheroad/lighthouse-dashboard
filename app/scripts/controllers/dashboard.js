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

        $scope.init = function () {
            NgMap.getMap().then(function (map) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    // Center the map
                    map.setCenter(pos);
                    // Draw the circle around the current position
                    $scope.circle = new google.maps.Circle({
                        strokeColor: '#FF0000',
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: '#000000',
                        fillOpacity: 0.15,
                        map: map,
                        center: pos,
                        radius: 4000,
                        editable: true
                    });
                }, function () {});
            });
        };

        $scope.filter = false;

        // Inject message factory in scope.
        $scope.messages = MessageFactory.messages;

        $scope.acknowledgeMessage = MessageFactory.acknowledgeMessage;

        $scope.deleteMessage = MessageFactory.deleteMessage;

        $scope.activeMessageId = '';

        $scope.centerMap = function (message) {
            $scope.activeMessageId = message.$id;
            NgMap.getMap().then(function (map) {
                map.setCenter({
                    lat: message.latitude,
                    lng: message.longitude
                });
            });
        };

        $scope.getPosition = function (message) {
            return '[' + message.latitude + ',' + message.longitude + ']';
        };

        $scope.toggleFilter = function () {
            $scope.filter = !$scope.filter;
        };

        $scope.filterByPosition = function (value, index, array) {
            if ($scope.filter) {
                var distance = google.maps.geometry.spherical.computeDistanceBetween($scope.circle.getCenter(), new google.maps.LatLng(value.latitude, value.longitude));
                return distance <= $scope.circle.getRadius();
            } else {
                return true;
            }
        };

        $scope.init();
    });
