import * as express from 'express'
import { Portal, SignUp, Login, Session, Logout, Write, DBPage } from './Routes'
import * as SLog from '../SLog'

class Router {
  static init(app: express.Application, router: express.Router): void {
    this.page(router)
    this.api(router)

    app.use(router)
    SLog.success('Router is Ready.')
  }

  static page(router: express.Router) {
    router.route('/').get(Portal.join)
    router.route('/signup').get(SignUp.join)
    router.route('/process/signup').post(SignUp.signup)
    router.route('/login').get(Login.join)
    router.route('/process/login').post(Login.login)
    router.route('/logout').get(Logout.join)
    router.route('/write').get(Write.join)
    router.route('/:username').get(DBPage.user)
  }

  static api(router: express.Router) {
    router.route('/api/session').post(Session.join)
  }
}

export default Router
