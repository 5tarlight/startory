$(() => {
  $('footer').hide()

  const update = () => {
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
  }

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

  $('.save').on('click', (event) => {
    event.preventDefault()
    update()
  })

  $('.input-markdown').change(update)

  setInterval(() => {
    update()
  }, 100);

  $('.submit').on('click', (event) => {
    event.preventDefault()
    const {
      title,
      desc,
      markdown,
      tag
    } = {
      title: $('.input-title').val(),
      desc: $('.input-desc').val(),
      markdown: $('.input-markdown').val(),
      tag: $('.tag').val().split(' ')
    }

    if(!title) {
      alert('제목이 필요힙니다.')
      return
    }else if (!markdown) {
      alert('내용이 필요합니다.')
      return
    }

    const data = {}
    data.title = title
    if(desc) data.desc = desc
    data.markdown = markdown
    if(tag.length > 0) data.tag

    $.ajax({
      url: '/process/write',
      type: 'POST',
      data: data,
      success: json => {}
    })
  })
})
