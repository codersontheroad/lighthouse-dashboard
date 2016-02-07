'use strict';

angular.module('lighthouseDashboardApp')
    .factory('MessageFactory',
        function MessageFactory(fbURL, $firebaseArray) {

            MessageFactory.ref = new Firebase(fbURL);

            MessageFactory.getMessages = function () {
                return $firebaseArray(MessageFactory.ref);
            };

            MessageFactory.acknowledgeMessage = function (message) {
                message.response = "Help is on the way";
                message.acknowledged = true;
                MessageFactory.messages.$save(message);
            };

            MessageFactory.deleteMessage = function (message) {
                MessageFactory.messages.$remove(message);
            };

            MessageFactory.newMessage = function (position, user) {
                var time = new Date();
                var uid = '';
                if (user.uid) uid = user.uid;
                return MessageFactory.messages.$add({
                    longitude: position.coords.longitude,
                    latitude: position.coords.latitude,
                    time: time.toUTCString(),
                    uid: uid
                });
            };

            MessageFactory.getMessage = function (ref) {
                var id = ref.key();
                return MessageFactory.messages.$getRecord(id);
            };

            MessageFactory.getMessageForUser = function (user, callback) {
                MessageFactory.ref.once('value', function (snapshot) {
                    var found = false;
                    snapshot.forEach(function (item) {
                        if (user.uid === item.val().uid) {
                            found = true;
                            MessageFactory.messages.$loaded().then(function () {
                                callback(MessageFactory.getMessage(item));
                            });
                            return true;
                        }
                    });
                    if (!found) {
                        callback(null);
                    }
                });
            };

            MessageFactory.messages = MessageFactory.getMessages();

            return MessageFactory;
        });
