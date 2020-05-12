$(document).ready(function(){

  $('.scroll_btn_right').click(function(){
    var next = $('.playlist_items').scrollLeft() + 260;
    $('.playlist_items').animate({
      scrollLeft: next 
    }, 750);
  });

  $('.scroll_btn_left').click(function(){
    var prev = $('.playlist_items').scrollLeft() - 260;
    $('.playlist_items').animate({
      scrollLeft: prev
    }, 750);
  });

  $('.playlist_items').scroll(function(){
    if($(this).scrollLeft() > 5){
      $('.scroll_btn_left').addClass('show');
    }
    else{
      $('.scroll_btn_left').removeClass('show');
    }
  });

  // iniciando a api do youtube para uma play list
  var apiKey = 'AIzaSyBVyYZ_PyBVyhdqTZync75h3WLnKenLW1E';
  var playlistId = 'PLzYMlWHitCJTdZRbXdWIaBBAolOnXZBFl';
  var channelId = 'UCBlL-vhD7zwMLuSuDBGXSXA';
  var url = 'https://www.googleapis.com/youtube/v3/playlistItems';
  var urlChannel = 'https://www.googleapis.com/youtube/v3/playlists';
  var requestOptions = {
    part: 'snippet',
    key: apiKey,
    maxResult: 20,
    playlistId: playlistId
  };

  var channelOptions ={
    part: 'snippet',
    key: apiKey,
    maxResult: 20,
    channelId: channelId
  };

  getPlayLists();

  getVideos();

  function getPlayLists(){
    $.getJSON(urlChannel, channelOptions, function(data){
      console.log(data);
    });
  };
  function getVideos(){
    $.getJSON(url, requestOptions, function(data){
      //console.log(data);
      var vidId = data.items[0].snippet.resourceId.videoId;
      mainVid(vidId);
      resultsList(data);
    });
  };

  function mainVid(vidId){
    $('#video .video_container').html(`
      <iframe 
        src="https://www.youtube.com/embed/${vidId}" 
        frameborder="0" 
        allow="accelerometer; 
        autoplay; 
        encrypted-media; 
        gyroscope;
        picture-in-picture" 
        allowfullscreen
      ></iframe>
    `);
  };

  function resultsList(data){

    $.each(data.items, function(i, item){
      var thumb = item.snippet.thumbnails.maxres.url;
      var title = item.snippet.title;
      var desc = item.snippet.description.substr(0, 96);
      var vid = item.snippet.resourceId.videoId;

      $('.playlist .playlist_items').append(`
        <article class="playlist_item" data-videoKey="${vid}" >
          <img class="thumb" src="${thumb}">
          <div class="detail">
            <h4 class="detail_title">${title}</h4>
            <p class="detail_desc">
              ${desc}...
            </p>
          </div>
        </article>    
      `);
    });    
  };

  $('.playlist .playlist_items').on('click','article', function(){
    var vidId = $(this).attr('data-videoKey');
    mainVid(vidId);
  });
});