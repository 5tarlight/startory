import * as express from 'express'
import { Portal } from './Routes'
import * as SLog from '../SLog'

class Router {
  static init(app:express.Application, router: express.Router): void {
    router.route('/').get(Portal.join)

    app.use(router)
    SLog.success('Router is Ready.')
  }
}

export default Router
