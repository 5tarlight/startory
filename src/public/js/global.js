$(() => {
  $.ajax({
    type: 'post',
    url: '/api/session',
    data: {},
    dataType: 'json',
    success: (json) => {
      const username = json.username
      if(username) {
        $('.t2').hide()
        $('.username-blank').html(`<a class='headeritem' style='margin-right: 5px;' href='/write' title='글쓰기'><b>글쓰기</b></a><a class='headeritem' href='/logout' title='로그아웃'><b>${username}</b></a>`).show()
      }
    },
    error: (xhr, status, err) => {
      alert(err)
    }
  })
})
