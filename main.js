$(document).ready(function(){
  // iniciando a api do youtube para uma play list
  var apiKey = 'AIzaSyBVyYZ_PyBVyhdqTZync75h3WLnKenLW1E';

  getPlayLists();
  
  function getPlayLists(){
    var urlChannel = 'https://www.googleapis.com/youtube/v3/playlists';
    var channelId = 'UCBlL-vhD7zwMLuSuDBGXSXA';
    var channelOptions ={
      part: 'snippet',
      key: apiKey,
      maxResult: 20,
      channelId: channelId
    };

    $.getJSON(urlChannel, channelOptions, function(data){
      console.log
      resultsPlayList(data);
      getVideos();
    });
  };

  function getVideos(){
    var url = 'https://www.googleapis.com/youtube/v3/playlistItems';
    var playlistId = 'PLzYMlWHitCJTdZRbXdWIaBBAolOnXZBFl';
    var requestOptions = {
      part: 'snippet',
      key: apiKey,
      maxResult: 20,
      playlistId: playlistId
    };

    $.getJSON(url, requestOptions, function(data){
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

  function resultsPlayList(data){
    $.each(data.items, function(i, item){
      var title = item.snippet.title;
      var listId = item.id;
      $('#playlists').append(`
        <section class="playlist" id="${listId}">
          <header class="playlist_header">
            <h3 class="playlist_title">
              ${title}
            </h3>
          </header>
          <div class="playlist_items">
          </div>
          <div class="scrollControl">
            <span class="scroll_btn_left">
              <svg class="svg-icon" viewBox="0 0 20 20">
                <path d="M11.739,13.962c-0.087,0.086-0.199,0.131-0.312,0.131c-0.112,0-0.226-0.045-0.312-0.131l-3.738-3.736c-0.173-0.173-0.173-0.454,
                0-0.626l3.559-3.562c0.173-0.175,0.454-0.173,0.626,0c0.173,0.172,0.173,0.451,0,0.624l-3.248,3.25l3.425,3.426C11.911,13.511,11.911,
                13.789,11.739,13.962 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,
                10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.148,3.374,7.521,7.521,7.521C14.147,17.521,17.521,
                14.148,17.521,10"></path>
              </svg>
            </span>
            <span class="scroll_btn_right">
              <svg class="svg-icon" viewBox="0 0 20 20">
                <path d="M12.522,10.4l-3.559,3.562c-0.172,0.173-0.451,0.176-0.625,0c-0.173-0.173-0.173-0.451,0-0.624l3.248-3.25L8.161,
                6.662c-0.173-0.173-0.173-0.452,0-0.624c0.172-0.175,0.451-0.175,0.624,0l3.738,3.736C12.695,9.947,12.695,10.228,12.522,
                10.4 M18.406,10c0,4.644-3.764,8.406-8.406,8.406c-4.644,0-8.406-3.763-8.406-8.406S5.356,1.594,10,1.594C14.643,1.594,18.406,
                5.356,18.406,10M17.521,10c0-4.148-3.374-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.147,3.374,7.521,7.521,7.521C14.147,
                17.521,17.521,14.147,17.521,10"></path>
              </svg>
            </span>
          </div>
        </section>  
      `);
    });

    $('.scroll_btn_right').click(function(){
      var next = $(this).parents('.playlist_items').scrollLeft() + 260;
      $('.playlist_items').animate({
        scrollLeft: next 
      }, 750);
    });

    $('.scroll_btn_left').click(function(){
      var prev = $(this).parents('.playlist_items').scrollLeft() - 260;
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

    $('.playlist .playlist_items').on('click','article', function(){
      var vidId = $(this).attr('data-videoKey');
      mainVid(vidId);
    });
  };
});