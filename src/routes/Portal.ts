import * as express from 'express'
import * as SLog from '../SLog'

class Portal {
  static join(req: express.Request, res: express.Response): void {
    SLog.info(req.ip + ' : portal')
    req.app.render('portal', (err: Error, html: string) => {
      if(err) {
        if (err.stack)
          SLog.err(err.stack)
        else throw err
      }

      res.end(html)
    })
  }
}

export default Portal
