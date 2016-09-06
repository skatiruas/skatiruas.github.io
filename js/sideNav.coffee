---
---
selected = (e, name=false)->
  if e.prop('checked')
    {self: e, name: 'professional', img: "{{site.data.images.professional}}" }
  else
    {self: e, name: 'personal', img: "{{site.data.images.personal}}" }

change_nav_img = (new_img, time=500)->
  img = $('.nav_img')
  img.animate({opacity: 0}, time, 
    ()->
      $("<img class='nav_img' src='#{new_img}' style='opacity:0;'>").load ->
        img.replaceWith($(@))
        $('.nav_img').animate({opacity: 1}, time)
  )

toggle_disabled = (e)-> e.prop('disabled',!e.prop('disabled'))
toggle_list_items = (e, value=0)->
  if e == 'personal'
    $('#nav_buttons_professional li').hide()
    $('#nav_buttons_personal li').show().css(opacity: value)
  else
    $('#nav_buttons_personal li').hide()
    $('#nav_buttons_professional li').show().css(opacity: value)

toggle_nav_color = ->
  e = $('.nav_personal, .nav_professional')
  if e.hasClass('nav_personal')
    e.removeClass('nav_personal').addClass('nav_professional')
  else
    e.removeClass('nav_professional').addClass('nav_personal')
go_to = (where)->
  window.location.href = where

$ ->
  $('nav i').hide().promise().done(->$('nav i').fadeIn())
  $('.page-content').hide().promise().done(->$('.page-content').fadeIn())
  values = selected($('.switch.nav_img_changer input'))

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
    toggle_nav_color()
    list_home = list.find('a:first')

    $('.page-content').fadeOut()
    $('nav i').fadeOut()

    $('ul #nav_buttons li').fadeOut().promise().done(
      ->toggle_list_items(values.name)
    )

    change_nav_img(values.img).promise().done(
      ->
        list_home.addClass('disabled')
        Materialize.showStaggeredList(list)
        setTimeout(toggle_disabled,600,values.self)
        if $('a[data-activates=slide-out]:visible').length > 0
          setTimeout($('#slide-out').sideNav,1000,'hide')
          setTimeout(go_to,1500,list_home.attr('href'))
        else
          setTimeout(go_to,800,list_home.attr('href'))
    )

  $('#lang_dropdown a').on 'click', (e)->
    e.preventDefault()
    $('.lang_button').html($(@).html())

  for a in $('#nav_buttons a')
    $(a).on 'click', (e)->
      e.preventDefault()
      if $(@).hasClass('disabled')
        $('#slide-out').sideNav('hide')
      else
        $('nav i').fadeOut()
        href = $(@).attr('href')
        $('.page-content').fadeOut().promise().done(
          ->
            if $('a[data-activates=slide-out]:visible').length > 0
              $('#slide-out').sideNav('hide')
              setTimeout(go_to,300,href)
            else
              go_to(href)
        )