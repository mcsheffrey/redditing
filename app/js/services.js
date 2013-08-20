'use strict';

/* Services */
Redditing.factory('imgurAlbumService', ['$http', function ($http) {
	var album = {
		getAlbumById: function(albumId) {
			return $.ajax({
			    url:'http://api.imgur.com/2/album/' + albumId + '.json?jsonp=JSON_CALLBACK',
			    dataType: 'json'
			});
		}
	}
	return album;
}]);