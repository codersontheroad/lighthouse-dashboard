'use strict';

/**
 * @ngdoc function
 * @name lighthouseDashboardApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the lighthouseDashboardApp
 */
angular.module('lighthouseDashboardApp')
    .controller('DashboardCtrl', function ($scope, Message, NgMap) {

    // Inject message factory in scope.
    $scope.message = Message;

        $scope.toggleColor = function () {
            var index = this.$index;
            var target = document.getElementsByClassName("ack")[index];
            if (target.className === "btn btn-success ack") {
                target.className = "btn btn-danger ack";
                target.innerHTML = "Acknowledge";
            } else {
                target.className = "btn btn-success ack";
                target.innerHTML = "Acknowledged";
                var myDataRef = new Firebase('https://rescue-lighthouse.firebaseio.com/');
                myDataRef.push({
                    "text": "Someone's coming!"
                });

            }
        };
    });
