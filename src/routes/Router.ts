import * as express from 'express'
import { Portal, SignUp } from './Routes'
import * as SLog from '../SLog'

class Router {
  static init(app:express.Application, router: express.Router): void {
    router.route('/').get(Portal.join)
    router.route('/signup').get(SignUp.join)
    router.route('/process/signup').post(SignUp.signup)

    app.use(router)
    SLog.success('Router is Ready.')
  }
}

export default Router
