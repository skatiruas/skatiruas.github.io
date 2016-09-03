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
toggle_list_items = (e)->
  if e.prop('checked')
    $('.btn_personal').closest('li').hide()
    $('.btn_professional').closest('li').show().css('opacity':0)
  else
    $('.btn_professional').closest('li').hide()
    $('.btn_personal').closest('li').show().css('opacity':0)


$ ->
  p_switch = $('.switch.nav_img_changer input')
  toggle_list_items(p_switch) 

  Materialize.showStaggeredList($('ul #nav_buttons'))

  p_switch.on 'change', ()->
    it = $(@)
    buttons = it.closest('#slide-out').find('#nav_buttons')
    toggle_disabled(it)
    $('.switch.nav_img_changer input').prop('checked', it.prop('checked'))
    toggle_nav_img(it)
    $('ul #nav_buttons li').fadeOut().promise().done(
      ->toggle_list_items(it).promise().done(
        ->Materialize.showStaggeredList(buttons)
      ).promise().done(->toggle_disabled(it))
    )