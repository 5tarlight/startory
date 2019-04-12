$(() => {
  $.ajax({
    type: 'get',
    url: '/api/session',
    data: {},
    dataType: 'json',
    success: (json) => {
      const username = json.username
      /*
       a.signup(href='/signup' title='회원가입')
          b 회원가입
      */
      if(username) {
        $('.t2').hide()
        $('.username-blank').html(`<a class='headeritem' href='/logout' title='로그아웃'><b>${username}</b></a>`).show()
      }
    },
    error: (xhr, status, err) => {
      alert(err)
    }
  })
})