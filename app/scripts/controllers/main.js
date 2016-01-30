'use strict';

angular.module('app')
  // .controller("SampleCtrl", function($scope, $firebaseObject) {
  //   var ref = new Firebase("https://gttrzh5n8tm.firebaseio-demo.com/");
  //   // download the data into a local object
  //   var syncObject = $firebaseObject(ref);
  //   // synchronize the object with a three-way data binding
  //   // click on `index.html` above to see it used in the DOM!
  //   syncObject.$bindTo($scope, "data");
  // })
  .controller("SampleCtrl", function($scope, $firebaseArray, NgMap) {
    var ref = new Firebase("https://gttrzh5n8tm.firebaseio-demo.com/");
    $scope.messages = $firebaseArray(ref);
    $scope.count = 0;
  });
