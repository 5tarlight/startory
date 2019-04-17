import * as express from 'express'
import * as SLog from '../../SLog'
import DB from '../../DB'

class Login {
  static join(req: express.Request, res: express.Response): void {
    SLog.info(req.ip + ' : login')
    req.app.render('login', (err: Error, html: string) => {
      if(err) {
        if (err.stack)
          SLog.err(err.stack)
        else throw err
      }

      res.end(html)
    })
  }

  static login(req: express.Request, res: express.Response): void {
    const username = req.body.username || req.query.username
    const password = req.body.password || req.query.password
    const exp: RegExp = /^\w\w{3,18}\w$/

    if(!username || !password) {
      res.redirect('/signup')
      return
    }

    if(!exp.test(username) || !exp.test(password)) {
      res.redirect('/signup')
      return
    }

    DB.query(`SELECT * FROM user WHERE username="${username}" AND password="${password}"`, (err, results, fileds) => {
      if(err) {
        if(err.stack) {
          SLog.err(err.stack)
          return
        } else SLog.err(err.toString())
      }

      if(results.length > 0) {
        SLog.info(req.ip + ' : Logged in as ' + username)
        if(req.session) {
          req.session.username = username
          res.redirect('/')
        }
        else SLog.err('Session is not Defined')
      } else {
        SLog.info(req.ip + ' : failed to log in')
        res.redirect('/login')
      }
    })
  }
}

export default Login
