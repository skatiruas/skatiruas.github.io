---
---
$ ->
  $('.name-waiting').removeClass('name-waiting').addClass('name-typewriter')
  $('.name-typewriter').one('webkitAnimationEnd oanimationend msAnimationEnd animationend',   
    ->
      $('.welcome-content').slideDown('slow')
  )