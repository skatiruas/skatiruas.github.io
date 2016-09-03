---
---
toggle_nav_img = (e, time=300)->
  img = $('.nav_img')
  new_img = 
    if e.prop('checked')
      "{{site.data.images.professional}}"
    else
      "{{site.data.images.personal}}"
  img.animate({opacity: 0}, time, 
    ()->
      img.attr('src',new_img)
      img.animate({opacity: 1}, time)
    )

toggle_disabled = (e)-> e.prop('disabled',!e.prop('disabled'))

$ ->
  Materialize.showStaggeredList($('ul #nav_buttons'))

  $('.switch.nav_img_changer input').on 'change', ()->
    toggle_disabled($(@))
    $('.switch.nav_img_changer input').prop('checked', $(@).prop('checked'))
    toggle_nav_img($(@))
    $('ul #nav_buttons li').fadeTo(20,0)
    Materialize.showStaggeredList($('ul #nav_buttons'))
    setTimeout(toggle_disabled, 800, $(@))