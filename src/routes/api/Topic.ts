import * as express from 'express'
import * as SLog from '../../SLog'
import DB from '../../DB'
import * as hljs from 'highlight.js'

class Portal {
  static join(req: express.Request, res: express.Response): void {
    const id = req.body.id
    const qtopic = req.body.topic
    
    DB.query('SELECT * FROM topic WHERE id=? AND author=?', [parseInt(qtopic), id], (err, results, fileds): void => {
      if(err) {
        SLog.err(err.stack || err.toString())
        return
      }
      if(results.length > 0) {
        const md = require('markdown-it')({
          highlight: function (str: string, lang: string) {
            if (lang && hljs.getLanguage(lang)) {
              try {
                return '<pre class="hljs"><code>' +
                        hljs.highlight(lang, str, true).value +
                        '</code></pre>';
              } catch (__) {}
            }
        
            return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
          }
        });

        const context = {
          title: results[0]['title'],
          desc: results[0]['desc'],
          article: results[0]['article'],
          tag: results[0]['tag'],
          author: results[0]['author'],
          id: id,
          topic: qtopic
        }

        res.json(context)
      } else {
        res.json({title: 'Error 404 - Page Not Found'})
      }
    })
  }
}

export default Portal
