'use strict';


var Redditing = angular.module('Redditing', ['ui.compat', 'infinite-scroll', 'Redditing.filters'])
	.config(
	['$stateProvider', '$routeProvider', '$urlRouterProvider',
	function ($stateProvider,   $routeProvider,   $urlRouterProvider) {
		$urlRouterProvider
			.when('/c?id', '/posts/:id')
			.otherwise('/');

		$routeProvider
			.when('/user/:id', {
				redirectTo: '/posts/:id',
			})
			.when('/', {
				redirectTo: '/posts/',	
	    });

	  $stateProvider
	    .state('posts', {
	      url: '/posts',
	      abstract: true,
	      templateUrl: 'partials/posts.html',
	      controller: PostsController,
	    })
	    // .state('posts.list', {
	    //   // parent: 'posts',
	    //   url: '',
	    //   templateUrl: 'partials/posts.list.html',
	    // })
	    .state('posts.detail', {
	      // parent: 'posts',
	      url: '/{postId}',
	      views: {
	        '': {
	          templateUrl: 'partials/posts.detail.html',
	          controller: PostDetailController,
	        },
	      },
	    })
	    // .state('contacts.detail.item', {
	    //   // parent: 'contacts.detail',
	    //   url: '/item/:itemId',
	    //   views: {
	    //     '': {
	    //       templateUrl: 'partials/contacts.detail.item.html',
	    //       controller:
	    //         [        '$scope', '$stateParams', '$state',
	    //         function ($scope,   $stateParams,   $state) {
	    //           $scope.item = findById($scope.contact.items, $stateParams.itemId);
	    //           $scope.edit = function () {
	    //             $state.transitionTo('contacts.detail.item.edit', $stateParams);
	    //           };
	    //         }],
	    //     },
	    //     'hint@': {
	    //       template: 'Overriding the view "hint@"',
	    //     },
	    //   },
	    // })
	    // .state('contacts.detail.item.edit', {
	    //   views: {
	    //     '@contacts.detail': {
	    //       templateUrl: 'partials/contacts.detail.item.edit.html',
	    //       controller:
	    //         [        '$scope', '$stateParams', '$state',
	    //         function ($scope,   $stateParams,   $state) {
	    //           $scope.item = findById($scope.contact.items, $stateParams.itemId);
	    //           $scope.done = function () {
	    //             $state.transitionTo('contacts.detail.item', $stateParams);
	    //           };
	    //         }],
	    //     },
	    //   },
	    // })
	    .state('about', {
	      url: '/about',
	      templateProvider:
	        [        '$timeout',
	        function ($timeout) {
	          return $timeout(function () { return "Hello world" }, 100);
	        }],
	    })
	}])
	.run(
	  [        '$rootScope', '$state', '$stateParams',
	  function ($rootScope,   $state,   $stateParams) {
	    $rootScope.$state = $state;
	    $rootScope.$stateParams = $stateParams;
	  }]);