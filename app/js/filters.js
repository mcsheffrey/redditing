'use strict';

/* Filters */

angular.module('sample.filters', []).

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
	filter('thumb', function() {
	  return function (text) {
    var isImgur = (/imgur*/).test(text),
        isImgurAlbum = text.indexOf('imgur.com/a/') >= 0;

    // if (isImgurAlbum) {
    //   console.log('return', fetchImgurAlbum(text));
      
    //   return fetchImgurAlbum(text);
    // }

    if(isImgur) {

      if(isImage(text)) {
        // do nothing
      } else {
        text += ".jpg"
      }
    } else {
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

/**
 * fetchImgurAlbum
 * @param  {[type]} postData
 * @return {[type]}
 */
function fetchImgurAlbum(postData) {
  var pathArray = postData.split( '/' ),
      hash = pathArray[4],
      albumUrl = 'http://api.imgur.com/2/album/' + hash + '.json',
      imgurAlbumHTML = '';

  $.getJSON(albumUrl, function(json, textStatus) {

    console.log(json, textStatus, json.album.cover);

    for (var i = 0; i < json.album.images.length; i++) {
      imgurAlbumHTML += '<img src="' + json.album.images[i].links.large_thumbnail + '" />';
    };

    console.log(imgurAlbumHTML);
    

    return imgurAlbumHTML;

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