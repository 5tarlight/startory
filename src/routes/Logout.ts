import * as express from 'express'
import * as SLog from '../SLog'

class Portal {
  static join(req: express.Request, res: express.Response): void {
    SLog.info(req.ip + ' : logout')

    if(req.session) {
      req.session.username = undefined
    }
    res.redirect('/')
  }
}

export default Portal
