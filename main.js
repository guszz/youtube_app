$(document).ready(function(){
  var slider = $('.playlist_items');
  var isDown = false;
  var startX;
  var scrolling;

  $(slider).mousedown(function(e){
    isDown = true;
    $(this).addClass('grabbing');
    startX = e.pageX - $(this).offset().left;

    scrolling = $(this).scrollLeft();
  });

  $(slider).mouseleave(function(){
    isDown = false;
    $(this).removeClass('grabbing');
  });

  $(slider).mouseup(function(){
    isDown = false;
    $(this).removeClass('grabbing');
  });

  $(slider).mousemove(function(e){
    if(!isDown) return;
    e.preventDefault();
    var x = e.pageX - $(this).offset().left;

    var walk = (x - startX) * 2;
    
    $(this).scrollLeft(scrolling - walk);
  });
  
  $('.scroll_btn_right').click(function(){
    var slider_id = $(this).parents('.playlist_items').attr('id');

    var next = $(this).parents('.playlist_items').scrollLeft() + 260;
    $('#'+slider_id+' .playlist_items').animate({
      scrollLeft: next 
    }, 750);
  });

  $('.scroll_btn_left').click(function(){
    var prev = $(this).parents('.playlist_items').scrollLeft() - 260;
    $('.playlist_items').animate({
      scrollLeft: prev
    }, 750);
  });

  if($('#youtube_api').length > 0 && screen.width > 768){
    var slider = $('.lists_container');
    var sliderItem = $('.lists_container .items_container');
    var isDown = false;
    var startX;
    var scrolling;

    $(slider).mousedown(function(e){
      e.preventDefault();
      isDown = true;
      $(this).addClass('grabbing');
      startX = e.pageX - $(this).offset().left;

      scrolling = $(this).scrollLeft();
    });

    $(slider).mouseleave(function(){
      isDown = false;
      $(this).removeClass('grabbing');
    });

    $(slider).mouseup(function(e){
      e.preventDefault();
      isDown = false;
      $(this).removeClass('grabbing');
    });

    $(slider).mousemove(function(e){
      if(!isDown) return;
      e.preventDefault();
      var x = e.pageX - $(this).offset().left;

      var walk = (x - startX) * 2;
      
      $(this).scrollLeft(scrolling - walk);
    });
  }
});