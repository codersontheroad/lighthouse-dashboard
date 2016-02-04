'use strict';

angular.module('lighthouseDashboardApp')
    .factory('MessageFactory',
        function MessageFactory(messageURL, $firebaseArray) {

            MessageFactory.getMessages = function () {
                return $firebaseArray(new Firebase(messageURL));
            };

            MessageFactory.acknowledgeMessage = function (message) {
                message.response = "Help is on the way";
                message.acknowledged = true;
                MessageFactory.messages.$save(message);
            };

            MessageFactory.messages = MessageFactory.getMessages();

            return MessageFactory;
        });
