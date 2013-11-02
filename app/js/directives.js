'use strict';

/* Directives */

/**
 * Imgur Album Directive
 * @return {string} [description]
 */
Redditing.directive('imgurAlbum',
	function(imgurAlbumService) {
		var imgurAlbumModule = {
       templateUrl: 'partials/imgur-album.html',
       replace: true,
       restrict: 'EACM',
       scope: {
           location: '@' //creates a one way binding between the parent controller and the directive scope variables.
       },
       link: function postLink(scope, iElement, iAttrs) {
       	console.log('anything happening?');
       	

           scope.$watch('location', function (newVal, oldVal) {
               if (newVal && newVal.length != "") {
               		if (newVal.indexOf('imgur.com/a/') >= 0) {
                  	getWeather(newVal);
                  }
               }
           });

           function getWeather(loc) {
            console.log(loc);
            

           		var pathArray = loc.split( '/' ),
						      hash = pathArray[4];

                  console.log(hash);
                  

               imgurAlbumService.getAlbumById(hash)
                   .success(function (data, status, headers, config) {
                      if (data) {
                        console.log(data);
                        
                        scope.album = data.album;
                        console.log(scope.album);
                        
                      };
                   });
           }

       }
   }
   return imgurAlbumModule;
	});