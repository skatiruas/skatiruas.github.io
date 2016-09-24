---
---
clickItems = (items, i)->
  items[i].click()
  setTimeout(clickItems, 500, items, i+1) if i+1 < items.length

$ ->
  scope = '.welcome-content'
  $('.collapsible, scope').collapsible({ accordion : false })
  panel_headers = $('.collapsible', scope).find('> li > .collapsible-header')
  panel_headers.off('click.collapse').css('pointer-events', 'none')

  $('.name-typewriter').one('webkitAnimationEnd oanimationend msAnimationEnd animationend',   
    ->
      $('.welcome-content').fadeIn().promise().done(
        ->
          items = $('.collapsible-header, scope')
          clickItems(items, 0)
      )
  )