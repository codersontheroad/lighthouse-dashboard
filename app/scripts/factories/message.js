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

            MessageFactory.deleteMessage = function (message) {
                MessageFactory.messages.$remove(message);
            };

            MessageFactory.newMessage = function (position) {
                var time = new Date();
                return MessageFactory.messages.$add({
                    longitude: position.coords.longitude,
                    lattitude: position.coords.latitude,
                    time: time.toJSON()
                });
            };

            MessageFactory.getMessage = function (ref) {
                var id = ref.key();
                return MessageFactory.messages.$getRecord(id);
            };

            MessageFactory.messages = MessageFactory.getMessages();

            return MessageFactory;
        });
