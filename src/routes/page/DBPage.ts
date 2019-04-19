import * as express from 'express'
import * as SLog from '../../SLog'
import DB from '../../DB'

class DBPage {
  static user(req: express.Request, res: express.Response): void {
    const qusername = req.params.username
    if(qusername == 'favicon.ico') return;

    DB.query('SELECT * FROM `user` WHERE `username`=?', [qusername], (err, results, fileds) => {
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
        res.end('<h1>Error 404 - Page Not Found</h1>')
        SLog.info(req.ip + ' : 404')
      }
    })
  }
}

export default DBPage
