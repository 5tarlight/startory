$(() => {
  $('footer').hide()

  $.ajax({
    type: 'post',
    url: '/api/session',
    data: {},
    dataType: 'json',
    success: (json) => {
      const username = json.username
      if(!username) {
        alert('로그인 후 이용하실 수 있습니다.')
        window.location.href = '/login'
      }
    },
    error: (xhr, status, err) => {
      alert(err)
    }
  })

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
