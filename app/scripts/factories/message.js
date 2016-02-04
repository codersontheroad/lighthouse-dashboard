'use strict';

angular.module('lighthouseDashboardApp')
    .factory('Message',
        function (messageURL, $firebaseArray) {
            return $firebaseArray(new Firebase(messageURL));
        });
