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

  /**
   * @todo 글쓰기 기능 구현
   * @body ajax를 이용해서 /process/write 으로 post 요청을 보내도록 구현 또는, write.pug를 수정해서 form을 이용해서 /process/write 로 post요청을 보내도록 수정. 글작성이 성공적으로 처리된 후에는 /authorid/topicid 로 리다이렉션 할것. 이를 위해 sql 에서 토픽 id 가 없으면 추가하고, /authorid 페이지로 이동시 유저의 정보를 반환하도록 구현. 또, /authorid/topic 으로 이동했을떄의 처리도 구현. 일단 먼저 /authorid 구현 후 authorid/topic 구현 후 글쓰기 기능 구현할 것. 또는, DB추가 기능부터 구현해도 됨. 
   */
})
