---
---
firstTime = true
$ ->
  window.onpopstate = -> window.location.reload()

  menu_btn = $('a[data-activates=slide-out]:visible')
  menu_btn.trigger('click') if firstTime and menu_btn.length and window.location.pathname == '/'
  firstTime = false
  	
