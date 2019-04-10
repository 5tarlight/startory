$(() => {
  $('.submitBtn').prop('disabled', true)
  $('#error').hide()

  const exp = /^\w\w{3,18}\w$/

  $('.passwordInput').on('blur', e => {
    if($('.usernameInput').val().trim().length < 5) {
      $('.submitBtn').prop('disabled', true)
      $('#text-zone').text('유저네임은 5글자 이상이여야 합니다.')
      $('#error').show()
    } else if (!exp.test($('.usernameInput').val())) {
      $('.submitBtn').prop('disabled', true)
      $('#text-zone').text('유저네임에는 숫자와 영어 대소문자만 사용 할 수 있습니다.')
      $('#error').show()
    } else if($('.passwordInput').val().trim().length < 5) {
      $('.submitBtn').prop('disabled', true)
      $('#text-zone').text('비밀번호는 5글자 이상이여야 합니다.')
      $('#error').show()
    } else if (!exp.test($('.passwordInput').val())) {
      $('.submitBtn').prop('disabled', true)
      $('#text-zone').text('비밀번호 숫자와 영어 대소문자만 사용 할 수 있습니다.')
      $('#error').show()
    }else {
      $('#error').hide()
      $('.submitBtn').prop('disabled', false)
    }
  })
  $('.usernameInput').on('blur', e => {
    if($('.usernameInput').val().trim().length < 5) {
      $('.submitBtn').prop('disabled', true)
      $('#text-zone').text('유저네임은 5글자 이상이여야 합니다.')
      $('#error').show()
    } else if (!exp.test($('.usernameInput').val())) {
      $('.submitBtn').prop('disabled', true)
      $('#text-zone').text('유저네임에는 숫자와 영어 대소문자만 사용 할 수 있습니다.')
      $('#error').show()
    } else if($('.passwordInput').val().trim().length < 5) {
      $('.submitBtn').prop('disabled', true)
      $('#text-zone').text('비밀번호는 5글자 이상이여야 합니다.')
      $('#error').show()
    } else if (!exp.test($('.passwordInput').val())) {
      $('.submitBtn').prop('disabled', true)
      $('#text-zone').text('비밀번호 숫자와 영어 대소문자만 사용 할 수 있습니다.')
      $('#error').show()
    }else {
      $('#error').hide()
      $('.submitBtn').prop('disabled', false)
    }
  })
})