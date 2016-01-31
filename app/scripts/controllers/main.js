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
    var ref = new Firebase("https://sizzling-inferno-4233.firebaseio.com/");
    $scope.messages = $firebaseArray(ref);
    $scope.toggleColor = function(){
      var index = this.$index;
      var target = document.getElementsByClassName("ack")[index];
      if(target.className=="btn btn-success ack"){
        target.className="btn btn-danger ack";
        target.innerHTML = "Acknowledge";
      }else{
        target.className="btn btn-success ack";
        target.innerHTML = "Acknowledged";
        var myDataRef = new Firebase('https://rescue-lighthouse.firebaseio.com/');
        myDataRef.push({
              "text": "Someone's coming!"
        });

      }

      // $("ack").addClass( "success" );
      // $("ack").removeClass( "danger" );
      // $("ack").css("background-color", "#000");
    }
    // $scope.remove = function() {
    //     var id = this.$index + 1;
    //     var itemRef = new Firebase("https://gttrzh5n8tm.firebaseio-demo.com/");
    //     itemRef.remove();
    //     console.log(this.$index);
    //     // $scope.messages.splice(this.$index, 1);
    //     ref.remove($scope.messages.this.$index);
    // };
  });
