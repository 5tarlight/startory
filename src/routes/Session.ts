import * as express from 'express'
import * as SLog from '../SLog'

class Portal {
  static join(req: express.Request, res: express.Response): void {
    res.json(req.session || {})
  }
}

export default Portal
