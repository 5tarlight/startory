function init(_id, _topic) {
  $.ajax({
    url: '/api/topic',
    dataType: 'json',
    type: 'POST',
    data: {
      id: _id,
      topic: _topic
    },
    success: (result) => {
      $('#title').text(result.title)
      $('#article').html(result.article)
      $('#author').text(`Author : ${result.author}`)
    }
  })
}
