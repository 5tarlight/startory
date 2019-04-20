import * as express from 'express'
import * as SLog from '../../SLog'
import DB from '../../DB'

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

  static topic(req: express.Request, res: express.Response): void {
    const qusername = req.params.username
    const qtopic = req.params.topic
    let id = 0

    DB.query('SELECT * FROM `user` WHERE `username`=?', [qusername], (err, results, fileds): void => {
      if(err) {
        SLog.err(err.stack || err.toString())
        return
      }

      if(results.length > 0) {
        id = results[0]['id']
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

    DB.query('SELECT * from `topic` WHERE `author`=? AND `id`=?', [id, qtopic], (err, results, fileds): void => {
      if(err) {
        SLog.err(err.stack || err.toString())
        return
      }

      if(results.length > 0) {
        res.end(`
        <h1>${results[0]['title']}</h1>
        <h3>Author: ${results[0]['author']}</h3>
        <div>${results[0]['article']}
        `)

        SLog.info(req.ip + ' : ' + qusername + '/' + qtopic)
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
}

export default DBPage
