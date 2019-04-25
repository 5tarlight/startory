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
      $('#article').html(window.markdownit({
        highlight: function (str, lang) {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return hljs.highlight(lang, str).value;
            } catch (__) {}
          }
      
          return ''; // use external default escaping
        }
      }).render(result.article))
      $('#author').text(`Author : ${result.author}`)

      const tags = result.tag.split(' ')
      $('#tag').html('')

      for(let i in tags) {
        $('#tag').append(`<span class="tagitem">${tags[i]}</span>`)
      }
    }
  })
}
