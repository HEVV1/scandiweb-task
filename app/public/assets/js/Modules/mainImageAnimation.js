import $ from 'jquery';

$(function(){
  $(document).on('mouseover mousemove', '.pdp__image-clicker-main .image', function(e){
    $($(this)).addClass('active');
    let initialWidth = $(this).width();
    let initialHeight = $(this).height();
    var relX = e.pageX - $(this).offset().left;
    var relY = e.pageY - $(this).offset().top;

    let precentageWidth = relX / (initialWidth / 100);
    let precentageHeight = relY / (initialHeight / 100);

    zoomImage(precentageWidth, precentageHeight);
  })
  $(document).on('mouseleave', '.pdp__image-clicker-main .image', function(e){
    $($(this)).removeClass('active');
    $('.image', '.pdp__image-clicker-main').css('background-position-x', `${50}%`)
    $('.image', '.pdp__image-clicker-main').css('background-position-y', `${50}%`)
  })
})

function zoomImage(x, y){  
  $('.image', '.pdp__image-clicker-main').css('background-position-x', `${x}%`)
  $('.image', '.pdp__image-clicker-main').css('background-position-y', `${y}%`)
}