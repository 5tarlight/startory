import * as express from 'express'
import * as SLog from '../../SLog'
import DB from '../../DB'
import * as hljs from 'highlight.js'

class DBPage {
  static user(req: express.Request, res: express.Response): void {
    const qusername = req.params.username
    if(qusername == 'favicon.ico') return;

    DB.query('SELECT * FROM `user` WHERE `username`=?', [qusername], (err, results, fileds): void => {
      if(err) {
        SLog.err(err.stack || err.toString())
        return
      }

      if(results.length > 0) {
        const userdata = results[0]
        const context = {
          username: userdata.username,
          desc: userdata.desc
        }

        req.app.render('user', context,(err: Error, html: string) => {
          if(err) {
            SLog.err(err.stack || err.toString())
            return
          }

          res.end(html)
          SLog.info(req.ip + ' : ' + qusername)
        })
      } else {
        req.app.render('404', {},(err: Error, html: string) => {
          if(err) {
            SLog.err(err.stack || err.toString())
            return
          }

          res.end(html)
          SLog.info(req.ip + ' : 404')
        })
      }
    })
  }

  static async topic(req: express.Request, res: express.Response): Promise<void> {
    const qusername = req.params.username
    const qtopic = req.params.topic
    
    DB.query('SELECT * FROM `user` WHERE `username`=?', [qusername], (err, results, fileds): void => {
      let id = 0
      if(err) {
        SLog.err(err.stack || err.toString())
        return
      }

      if(results.length > 0) {
        id = results[0]['id']

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
            
            const html = md.renderInline(results[0]['article'])

            res.end(`
            <h1>${results[0]['title']}</h1>
            <h3>Author: ${qusername}</h3>
            <div>${html}</div>
            `)
    
            SLog.info(req.ip + ' : ' + qusername + '/' + qtopic)
          } else {
            req.app.render('404', {}, (err: Error, html: string) => {
              if(err) {
                SLog.err(err.stack || err.toString())
                return
              }
    
              res.end(html)
              SLog.info(req.ip + ' : 404(topic)')
            })
          }
        })
      } else {
        req.app.render('404', {}, (err: Error, html: string) => {
          if(err) {
            SLog.err(err.stack || err.toString())
            return
          }

          res.end(html)
          SLog.info(req.ip + ' : 404(author)')
        })
      }
    })
  }
}

export default DBPage
