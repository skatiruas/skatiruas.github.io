---
---
selected = (e, name=false)->
  language = $('.lang_button').html()
  if e.prop('checked')
    { self: e, name: "professional_#{language}" }
  else
    { self: e, name: "personal_#{language}" }

change_nav_img = (time=500)->
  img = $('.nav_img')
  new_img = $('.nav_img_hidden')
  img.animate({opacity: 0}, time, 
    ()->
      new_img.css({opacity: 0}).removeClass('nav_img_hidden').addClass('nav_img')
      img.removeClass('nav_img').addClass('nav_img_hidden')
      new_img.animate({opacity: 1}, time)
  )

toggle_disabled = (e)-> e.prop('disabled',!e.prop('disabled'))

select_button = (b)-> 
  $('#nav_buttons a.disabled').removeClass('disabled')
  b.addClass('disabled')

toggle_list_items = (e, value=0)->
  $("#nav_buttons li").hide()
  $("#nav_buttons_#{e} li").show().css(opacity: value)

toggle_nav_color = ->
  e = $('.nav_personal, .nav_professional')
  if e.hasClass('nav_personal')
    e.removeClass('nav_personal').addClass('nav_professional')
  else
    e.removeClass('nav_professional').addClass('nav_personal')

change_pages = (href)->
  $('.brand-logo').fadeOut()
  $('.page-content').fadeOut().promise().done(
    ->
      select_button($("#nav_buttons a[href='#{href}']"))
      if $('a[data-activates=slide-out]:visible').length > 0
        $('#slide-out').sideNav('hide')
        setTimeout(go_to,300,href)
      else
        go_to(href)
  )

stripScripts = (html)->
  div = document.createElement('div')
  $(div).html(html)
  scripts = $(div).find('script')
  i = scripts.length
  while (i--)
    scripts[i].parentNode.removeChild(scripts[i])
  return [$(div).html(), scripts]

go_to = (where)->
  $.get
    url: where,
    async: true,
    success: (data)->
      history.pushState(null, null, where)
      loaded = $(data)
      [html, scripts] = stripScripts(loaded.find('.page-content').html())
      $('.page-content').html(html)
      $('.page-content').fadeIn().promise().done(
        ->
          for s in scripts
            $.getScript $(s).attr('src')
        )
      $('.brand-logo').html(loaded.find('.brand-logo').html())
      $('.brand-logo').fadeIn()

firstTime = true
first_time_init = ()->
  menu_btn = $('a[data-activates=slide-out]:visible')
  path = window.location.pathname
  menu_btn.trigger('click') if firstTime and menu_btn.length and (path == '/' or path == '/pt-br/')
  firstTime = false

initialize = ()->
  first_time_init()
  values = selected($('.switch.nav_img_changer input'))

  toggle_list_items(values.name)
  toggle_disabled(values.self)
  setTimeout(Materialize.showStaggeredList,200,$("#nav_buttons_#{values.name}"))
  setTimeout(toggle_disabled,600,values.self)

#---Personal/Professional Switch-----
  values.self.on 'change', ()->
    values = selected($(@))
    list = $("#nav_buttons_#{values.name}")
    toggle_disabled(values.self)
    toggle_nav_color()
    list_home = list.find('a:first')

    $('.page-content').fadeOut()
    $('.brand-logo').fadeOut()

    setTimeout(go_to,600,list_home.attr('href'))

    change_nav_img()

    $('ul #nav_buttons li').fadeOut().promise().done(
      ->
        toggle_list_items(values.name).promise().done(->select_button(list_home))
        Materialize.showStaggeredList(list)
        setTimeout(toggle_disabled,600,values.self)
        setTimeout($('#slide-out').sideNav,1000,'hide') if $('a[data-activates=slide-out]:visible').length > 0
    )
#---Language Dropdown-----
  for lang in $('#lang_dropdown a')
    $(lang).on 'click', (e)->
      e.preventDefault()
      if $(@).html() != $('.lang_button').html()
        $('.lang_button').html($(@).html())
        values = selected($('.switch.nav_img_changer input'))
        toggle_list_items(values.name, 1)
        href = window.location.pathname
        if href.split('/')[1] == 'pt-br'
          personal = "{{site.en.personal}}"
          professional = "{{site.en.professional}}"
          href = href.replace('/pt-br/','/')
        else
          personal = "{{site.pt-br.personal}}"
          professional = "{{site.pt-br.professional}}"
          href = '/pt-br' + href
        nav_switch = $('.switch.nav_img_changer')
        nav_switch.find('.col:first').html(personal)
        nav_switch.find('.col:last').html(professional)
        change_pages(href)
        

#---Nav Buttons-----
  for a in $('#nav_buttons a')
    $(a).on 'click', (e)->
      e.preventDefault()
      btn = $(@)
      if btn.hasClass('disabled')
        $('#slide-out').sideNav('hide')
      else
        href = btn.attr('href')
        change_pages(href)

$ ->
  window.onpopstate = -> window.location.reload()

$(window).on 'load',()->
  $('main, footer').fadeIn().promise().done(->initialize())