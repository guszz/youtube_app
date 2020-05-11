$(document).ready(function(){
  $('.scroll_btn_right').click(function(){
    $('.playlist_items').animate({
      scrollLeft: 300
    }, 1000);
  });

  $('.scroll_btn_left').click(function(){
    $('.playlist_items').animate({
      scrollLeft: -300
    }, 1000);
  });

  $('.playlist_items').scroll(function(){
    if($(this).scrollLeft() > 5){
      $('.scroll_btn_left').addClass('show');
    }
    if($(this).scrollLeft() <= 5){
      $('.scroll_btn_left').removeClass('show');
    }
  });
});