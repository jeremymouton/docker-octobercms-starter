/**
 * Nav collapse
 *
 */

import $ from 'jquery'

$('.js-nav-toggle').click( function(e) {
  e.preventDefault()
  var target = $(this).data('nav-collapse')
  $(target).toggleClass('nav-is-open')
})

Modernizr.on('touchevents', function(result) {
  if (result) {
    $('html').on('click', function(e) {
      $('.nav-section__item').removeClass('hover')
    })

    $('.nav-section__item').on('click', function(e) {
      if (!$(this).hasClass('hover') && $(this).has('.nav-dropdown').length > 0) {
        e.preventDefault()
        e.stopPropagation()
      }

      $('.nav-section__item').removeClass('hover')
      $(this).toggleClass('hover')
    })
  }
})
