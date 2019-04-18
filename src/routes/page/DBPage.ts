import * as express from 'express'
import * as SLog from '../../SLog'
import DB from '../../DB'

class DBPage {
  static user(req: express.Request, res: express.Response): void {
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf8'})
    const qusername = req.params.username

    DB.query('SELECT * FROM `user` WHERE `username`=?', [qusername], (err, results, fileds) => {
      if(err) {
        SLog.err(err.stack || err.toString())
        return
      }

      if(results.length > 0) {
        const userdata = results[0]

        
        res.send(`<h1>${userdata.username}</h1>`)
        res.end(`<h3>Profile : ${userdata.desc}</h3>`)
      } else {
        res.end('<h1>Error 404 - Page Not Found</h1>')
      }
    })

    SLog.info(req.ip + ' : ' + qusername)
  }
}

export default DBPage
