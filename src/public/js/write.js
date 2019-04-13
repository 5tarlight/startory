/**
 * @todo 마크다운 하이라이팅 적용하기
 * @body html 에서 쓸수 있는 모듈을 찾아보고 없으면 express 환경에서 쓸 수 있는 모듈을 찾아 ajax로 처리
 */

$(() => {
  $('footer').hide()

  $('.save').on('click', event => {
    event.preventDefault()

    const md = $('.input-markdown').val()
    $('.markdown').html(markdown.toHTML(md))
  })
})