import $ from 'jquery';

const header_links = '.header__link';
let link_index = 0;

$(function () {
  $(header_links).eq(link_index).addClass('active-scale');
  $(header_links).eq(link_index).addClass('active');
  $(header_links).parent().on('click', function () {
    if ($(this).index() > link_index) {
      $(header_links).removeClass('active-direction-right');
      $(header_links).removeClass('active-direction-left');
      for (let i = 0; i < $(header_links).length; i++) {
        if ($(this).index() == i) {
          $(header_links).eq(i).addClass('active-direction-left');
          $(header_links).eq(i).addClass('active-scale');
          $(header_links).eq(i).addClass('active');
        }
        else {
          $(header_links).eq(link_index).addClass('active-direction-right');
          $(header_links).eq(link_index).removeClass('active-scale');
          $(header_links).eq(link_index).removeClass('active');
        }
      }
      link_index = $(this).index();
    }
    else if ($(this).index() < link_index) {
      for (let i = $(header_links).length - 1; i >= 0; i--) {
        if ($(this).index() == i) {
          $(header_links).eq(i).addClass('active-direction-right');
          $(header_links).eq(i).addClass('active-scale');
          $(header_links).eq(i).addClass('active');
        }
        else {
          $(header_links).eq(link_index).removeClass('active-direction-right');
          $(header_links).eq(link_index).addClass('active-direction-left');
          $(header_links).eq(link_index).removeClass('active-scale');
          $(header_links).eq(link_index).removeClass('active');
        }
      }
      link_index = $(this).index();
    }
  })
})
