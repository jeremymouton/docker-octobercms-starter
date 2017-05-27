/**
 * Nav collapse
 *
 */

import $ from 'jquery'
import '../vendors/modernizr'

$('.js-nav-collapse').click(function(e) {
  e.preventDefault()
  const target = $(this).data('nav-collapse')
  $(target).toggleClass('nav-is-open')
})

Modernizr.on('touchevents', (result) => {
  if (result) {
    $('html').on('click', () => {
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
