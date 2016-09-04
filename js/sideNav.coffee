---
---
selected = (e, name=false)->
  if e.prop('checked')
    {self: e, name: 'professional', img: "{{site.data.images.professional}}" }
  else
    {self: e, name: 'personal', img: "{{site.data.images.personal}}" }

toggle_nav_img = (new_img, time=500)->
  img = $('.nav_img')
  img.animate({opacity: 0}, time, 
    ()->
      img.attr('src',new_img)
      img.animate({opacity: 1}, time)
    )

toggle_disabled = (e)-> e.prop('disabled',!e.prop('disabled'))
toggle_list_items = (e, value=0)->
  if e == 'personal'
    $('#nav_buttons_professional li').hide()
    $('#nav_buttons_personal li').show().css(opacity: value)
  else
    $('#nav_buttons_personal li').hide()
    $('#nav_buttons_professional li').show().css(opacity: value)

$ ->
  values = selected($('.switch.nav_img_changer input'))
  $('.nav_btn.disabled').on 'click', (e)-> e.preventDefault()
  if document.referrer != ''
    toggle_list_items(values.name, 1)
  else
    toggle_list_items(values.name)
    toggle_disabled(values.self)
    setTimeout(Materialize.showStaggeredList,200,$("#nav_buttons_#{values.name}"))
    setTimeout(toggle_disabled,600,values.self)

  values.self.on 'change', ()->
    values = selected($(@))
    list = $("#nav_buttons_#{values.name}")
    toggle_disabled(values.self)
    toggle_nav_img(values.img)
    $('ul #nav_buttons li').fadeOut().promise().done(
      ->toggle_list_items(values.name).promise().done(
        ->
          Materialize.showStaggeredList(list)  
          setTimeout(toggle_disabled,600,values.self)
      )
    )
  $('#lang_dropdown a').on 'click', (e)->
    e.preventDefault()
    $('.lang_button').html($(@).html())