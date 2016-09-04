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
toggle_list_items = (e, value=0)->
  if e.prop('checked')
    $('.nav_btn.btn_personal').closest('li').hide()
    $('.nav_btn.btn_professional').closest('li').show().css(opacity: value)
  else
    $('.nav_btn.btn_professional').closest('li').hide()
    $('.nav_btn.btn_personal').closest('li').show().css(opacity: value)  

$ ->
  p_switch = $('.switch.nav_img_changer input')
  $('.nav_btn.disabled').on 'click', (e)-> e.preventDefault()
  toggle_list_items(p_switch, 1)

  p_switch.on 'change', ()->
    it = $(@)
    list = $('.nav_btn').closest('ul')
    toggle_disabled(it)
    $('.switch.nav_img_changer input').prop('checked', it.prop('checked'))
    toggle_nav_img(it)
    $('ul #nav_buttons li').fadeOut().promise().done(
      ->toggle_list_items(it).promise().done(
        ->
          Materialize.showStaggeredList(list)  
          setTimeout(toggle_disabled,800,it)
      )
    )