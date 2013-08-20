'use strict';

/* Filters */

angular.module('Redditing.filters', []).

	/**
	 * Markdown - generate markdown
	 * @return {string}
	 */
  filter('markdown', function () {
    return function (text) {

      if (typeof text === 'undefined') {
        return;
      }
      text = text.replace("] (","](");
      var converter = new Showdown.converter();

      var htmlText = converter.makeHtml(text);

      return htmlText;
		};
	}).

	/**
	 * Thumb - generate embed <img> tag from url
	 * @return {string}
	 */
	filter('thumb', function($http) {
	  return function (text) {
    var isImgur = (/imgur*/).test(text),
        isImgurAlbum = text.indexOf('imgur.com/a/') >= 0;

    // if (isImgurAlbum) {
    //   var promise = fetchImgurAlbum(text);
      
    //   promise.success(function(data) {
    //     var imgurAlbumHTML = '';
    //     for (var i = 0; i < data.album.images.length; i++) {
    //       imgurAlbumHTML += '<img src="' + data.album.images[i].links.large_thumbnail + '" />';
    //     };
    //     console.log('imgurAlbumHTML', imgurAlbumHTML);
        
    //     return imgurAlbumHTML;
    //    });
    // }
    
      // YOUTUBE: If embedded video is real, render it
  // Include case for "youtu.be" urls 
  
    if (isYoutube(text)) {
      var youtubeID = text.replace(/^[^v]+v.(.{11}).*/,"$1");
      return '<div class="video" style="width: 640px; height: 360px; overflow: hidden; position: relative;"><iframe frameborder="0" scrolling="no" seamless="seamless" webkitallowfullscreen="webkitAllowFullScreen" mozallowfullscreen="mozallowfullscreen" allowfullscreen="allowfullscreen" id="okplayer" width="640" height="360" style="position: absolute; top: 0px; left: 0px; width: 640px; height: 360px;" src="http://youtube.com/embed/'+youtubeID+'?loop=1&amp;hd=1&amp;controls=0&amp;showinfo=0&amp;modestbranding=1&amp;iv_load_policy=3&amp;rel=0&amp;playlist='+youtubeID+'"></iframe></div>'
    }

    if(isImgur) {

      if(isImage(text)) {
        // do nothing
      } else {
        text += ".jpg"
      }
    } else {

      // add support for livememe
      var isQuickMeme = (/(?:qkme\.me|quickmeme\.com\/meme)\/(\w*)/).exec(text);
      if (isQuickMeme !== null) {
        text = "http://i.qkme.me/" + isQuickMeme[1] + ".jpg";
      }
    }
    if(isImage(text)) {
      return '<a class="image-embed"><img src="'+text+'" alt="" /></a>';
    } 
  };
});

/**
 * Determine if URL is an image
 * @param  {string}  str
 * @return {Boolean}
 */
function isImage(str){
  
  var result = (/\.(?=gif|jpg|png)/gi).test(str);
  if (result) {
    return true;
  } else {
    return false;
  }
}

//Determine is this is a youtube video
function isYoutube(str){
  var urlResult = str.indexOf('youtube');
  // Doesn't link to youtubes that aren't videos
  var videoResult = str.indexOf('watch');
  if (urlResult != -1 && videoResult != -1) {
    return true;
  }
}

/**
 * fetchImgurAlbum
 * @param  {[type]} postData
 * @return {[type]}
 */
function fetchImgurAlbum(postData) {
  var pathArray = postData.split( '/' ),
      hash = pathArray[4],
      albumUrl = 'http://api.imgur.com/2/album/' + hash + '.json';

  return $.ajax({
    url: albumUrl,
    dataType: 'json',
    success: function(data, textStatus, xhr) {
      console.log(data, textStatus, xhr);
    
    }
  });
  

}

/**
 * render first image as a preview and store rest of src tags as data attributes
 * @param  {[type]} postData
 * @param  {[type]} imgurAlbumData
 * @return {[type]}
 */
// function renderAlbum(postData, imgurAlbumData) {
//   var albumTemplateSource = $("#imgurAlbumTemplate").html(),
//       albumTemplate = Handlebars.compile(albumTemplateSource),
//       albumHTML = albumTemplate(imgurAlbumData.album);
    
      
//   $('#' + postData.name).find('.image-embed').html(albumHTML);

//   var $previewImage = $('#album-' + imgurAlbumData.album.cover).find('li:first-of-type img'),
//       previewImageSrc = $previewImage.data('src');

//   $previewImage.attr('src', previewImageSrc);

//   // bind click event to first image to load rest of album
//   $('#album-' + imgurAlbumData.album.cover).find('.open-album').bind('click', function(event) {
    
//     $(this).siblings('li').find('img').each(function(index) {

//       $(this).attr('src', $(this).data('src'));

//     });

//     $(this).parents('.imgur-album').addClass('show-album');

//   });
// }