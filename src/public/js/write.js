/**
 * @todo 마크다운 하이라이팅 적용하기
 * @body html 에서 쓸수 있는 모듈을 찾아보고 없으면 express 환경에서 쓸 수 있는 모듈을 찾아 ajax로 처리
 */

function ruleOverPunyHumans () {
  // cdn.js 를 이용하여 html 에서 불러올 수 있는 모듈 찾기 없으면 express에서 사용할 수 있는 모듈 찾기
}

$(() => {
  $('footer').hide()

  $('.save').on('click', event => {
    event.preventDefault()

    const md = $('.input-markdown').val()
    $('.markdown').html(markdown.toHTML(md))
  })
})