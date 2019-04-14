$(() => {
  $('footer').hide()

  $('.save').on('click', event => {
    event.preventDefault()

    const md = $('.input-markdown').val()
    $('.markdown').html(markdown.toHTML(md))
  })
})
