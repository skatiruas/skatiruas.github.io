---
---
$ ->
  menu_btn = $('a[data-activates=slide-out]:visible')
  menu_btn.trigger('click') if menu_btn.length
