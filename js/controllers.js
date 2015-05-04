angular.module('movieApp.controllers',[]).controller('MovieListController',function($scope,$state,popupService,$window,Movie){

    $scope.movies=Movie.query();

    $scope.deleteMovie=function(movie,$state){
        if(popupService.showPopup('Really delete this?')){
            movie.$delete(function(){
                $window.location.href='';
            });
        }
    }

}).controller('MovieViewController',function($scope,$stateParams,Movie){

    $scope.movie=Movie.get({id:$stateParams.id});

}).controller('MovieCreateController',function($scope,$state,$stateParams,Movie){

    $scope.movie=new Movie();

    $scope.addMovie=function(){
        $scope.movie.$save(function(){
            $state.go('resource');
        });
    }

}).controller('MovieEditController',function($scope,$state,$stateParams,Movie){

    $scope.updateMovie=function(){
        $scope.movie.$update(function(){
            $state.go('resource');
        });
    };

    $scope.loadMovie=function(){
        $scope.movie=Movie.get({id:$stateParams.id});
    };

    $scope.loadMovie();
}).controller('mainController',function($scope){
	
	$scope.message = 'Everyone come and see how good I look!';
   
}).controller('contactController', function ($scope, $http, $log, $timeout){
	
	$scope.subjectListOptions = {
      'bug': 'Report a Bug',
      'account': 'Account Problems',
      'mobile': 'Mobile',
      'user': 'Report a Malicious User',
      'other': 'Other'
    };

    // Inititate the promise tracker to track form submissions.
    //$scope.progress = promiseTracker();

    // Form submit handler.
    $scope.submit = function(form) {
      // Trigger validation flag.
      $scope.submitted = true;

      // If form is invalid, return and let AngularJS show validation errors.
      if (form.$invalid) {
        return;
      }

      // Default values for the request.
      var config = {
        params : {
          'callback' : 'JSON_CALLBACK',
          'name' : $scope.name,
          'email' : $scope.email,
          'subjectList' : $scope.subjectList,
          'url' : $scope.url,
          'comments' : $scope.comments
        },
      };

      // Perform JSONP request.
      var $promise = $http.jsonp('response.json', config)
        .success(function(data, status, headers, config) {
          if (data.status == 'OK') {
            $scope.name = null;
            $scope.email = null;
            $scope.subjectList = null;
            $scope.url = null;
            $scope.comments = null;
            $scope.messages = 'Your form has been sent!';
            $scope.submitted = false;
          } else {
            $scope.messages = 'Oops, we received your request, but there was an error processing it.';
            $log.error(data);
          }
        })
        .error(function(data, status, headers, config) {
          //$scope.progress = data;
          $scope.messages = 'There was a network error. Try again later.';
          $log.error(data);
        })
        .finally(function() {
          // Hide status messages after three seconds.
          $timeout(function() {
            $scope.messages = null;
          }, 3000);
        });

      // Track the request and show its progress to the user.
     // $scope.progress.addPromise($promise);
    };
   
});
