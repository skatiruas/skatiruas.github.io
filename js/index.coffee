---
---
$ ->
  menu_btn = $('a[data-activates=slide-out]:visible')
  menu_btn.trigger('click') if menu_btn.length and document.referrer == '' and window.location.pathname == '/'

  window.onpopstate = -> window.location.reload()