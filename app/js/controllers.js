'use strict';

/* Controllers */

/**
 * Reddit Post Controller
 * @param {[type]} $scope
 * @param {[type]} $http
 */
function PostsController($scope, $http) {
  $scope.posts = [];
  $scope.busy = false;
  $scope.after = '';

  $scope.nextPage = function() {
    if ($scope.busy) return;
    $scope.busy = true;

    var url = "http://api.reddit.com/hot?after=" + $scope.after + "&jsonp=JSON_CALLBACK";
    $http.jsonp(url).success(function(data, status, headers, config) {
      console.log(data, status, headers, config);

      var posts = data.data.children;
      for (var i = 0; i < posts.length; i++) {
        $scope.posts.push(posts[i].data);
      }
      $scope.after = "t3_" + $scope.posts[$scope.posts.length - 1].id;
      $scope.busy = false;
    });
  };

  // $http.jsonp('http://www.reddit.com/.json?limit=25&jsonp=angular.callbacks._0').success(function(data, status, headers, config) {
  //   console.log(data, status, headers, config);
    
  //   $scope.posts = data.data.children;
  // });

  $scope.orderProp = 'age';
}

/**
 * Reddit Comments Controller
 * @param {[type]} $scope
 * @param {[type]} $stateParams
 * @param {[type]} $http
 */
function PostDetailController($scope, $stateParams, $http) {
    $scope.comments = [];
    $scope.postDetails = [];
    $scope.busy = false;
    $scope.after = '';

    $scope.nextPage = function() {
      if ($scope.busy) return;
      $scope.busy = true;
      console.log('after', $scope.after);
      
    var url = 'http://www.reddit.com/comments/' + $stateParams.postId + '/.json?&sort=top&depth=5&after=' + $scope.after + '&jsonp=JSON_CALLBACK'

    $http.jsonp(url).success(function(data, status, headers, config) {
      console.log(data, status, headers, config);

      var comments = data[1].data.children;
      $scope.postDetails = data[0].data.children[0].data;

      for (var i = 0; i < comments.length; i++) {
        $scope.comments.push(comments[i].data);
      }

      $scope.after = "t1_" + $scope.comments[$scope.comments.length - 1].id;
      $scope.busy = false;


    });

    };

  $scope.setImage = function(imageUrl) {
    $scope.mainImageUrl = imageUrl;
  }
}