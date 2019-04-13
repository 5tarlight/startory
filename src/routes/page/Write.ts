import * as express from 'express'
import * as SLog from '../../SLog'

class Write {
  static join(req: express.Request, res: express.Response): void {
    SLog.info(req.ip + ' : write')
    req.app.render('write', (err: Error, html: string) => {
      if(err) {
        if (err.stack)
          SLog.err(err.stack)
        else throw err
      }

      res.end(html)
    })
  }
}

export default Write
