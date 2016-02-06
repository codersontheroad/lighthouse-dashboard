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
                    $scope.circleCenter = pos;
                    $scope.circleRadius = 4000;
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
                        radius: $scope.circleRadius,
                        editable: true
                    });
                    // Add event listeners to react when circle is updated
                    google.maps.event.addListener($scope.circle, 'center_changed', function () {
                        $scope.$apply(function () {
                            $scope.circleCenter = $scope.circle.getCenter();
                        });
                    })
                    google.maps.event.addListener($scope.circle, 'radius_changed', function () {
                        $scope.$apply(function () {
                            $scope.circleRadius = $scope.circle.getRadius();
                        });
                    })
                }, function (err) {
                    console.warn('ERROR(' + err.code + '): ' + err.message);
                });
            });
        };

        $scope.filter = false;

        // Inject message factory in scope.
        $scope.messages = MessageFactory.messages;

        $scope.acknowledgeMessage = MessageFactory.acknowledgeMessage;

        $scope.deleteMessage = function (message, $event) {
            MessageFactory.deleteMessage(message);
            $event.stopPropagation();
        };

        $scope.activeMessageId = '';
        $scope.highlightedMessageId = '';

        $scope.selectMessage = function (message) {
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
                return isInsideCircle($scope.circleCenter, $scope.circleRadius, value);
            } else {
                return true;
            }
        };

        $scope.markerOpacity = function (message) {
            var opacity = 0.75;
            if ($scope.filter) {
                if (!isInsideCircle($scope.circleCenter, $scope.circleRadius, message)) {
                    opacity = 0.5;
                }
            }
            if ($scope.highlightedMessageId == message.$id) {
                opacity = 1;
            }
            return opacity;
        };

        $scope.markerIcon = function (message) {
            var iconUrl = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
            if ($scope.activeMessageId == message.$id) {
                iconUrl = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
            }
            return iconUrl;
        };

        $scope.highlightMessage = function (message) {
            $scope.highlightedMessageId = message.$id;
        };

        $scope.removeHighlight = function () {
            $scope.highlightedMessageId = '';
        };

        $scope.init();
    });

var isInsideCircle = function (center, radius, pos) {
    if (center && radius) {
        var distance = google.maps.geometry.spherical.computeDistanceBetween(center, new google.maps.LatLng(pos.latitude, pos.longitude));
        return distance <= radius;
    } else {
        return true;
    }
};
