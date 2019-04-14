$(() => {
  $('footer').hide()

  $('.save').on('click', event => {
    event.preventDefault()

    const md = window.markdownit({
      highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(lang, str).value;
          } catch (__) {}
        }
    
        return ''; // use external default escaping
      }
    })
    const markdown = $('.input-markdown').val()
    $('.markdown').html(md.render(markdown))
  })
})
