import * as express from 'express'
import * as SLog from '../../SLog'
import DB from '../../DB'

class SignUp {
  static join(req: express.Request, res: express.Response): void {
    SLog.info(req.ip + ' : sign up')
    req.app.render('signup', (err: Error, html: string) => {
      if(err) {
        if (err.stack)
          SLog.err(err.stack)
        else throw err
      }

      res.end(html)
    })
  }

  static signup(req: express.Request, res: express.Response): void {
    const username = req.body.username || req.query.usrename
    const password = req.body.password || req.query.password
    const profile = req.body.profile || req.query.profile
    const exp: RegExp = /^\w\w{3,18}\w$/

    if(!username || !password) {
      res.redirect('/signup')
      return
    }

    if(!exp.test(username) || !exp.test(password)) {
      res.redirect('/signup')
      return
    }
    const query = 'INSERT INTO `user` (`username`, `password`, `desc`) VALUES (?, ?, ?)'
    const data = [username, password, profile ? profile : '']
    DB.query(query, data, (err, results, fileds) => {
      if(err) {
        if(err.stack) {
          SLog.err(err.stack)
          return
        } else SLog.err(err.toString())
      }
      if(req.session) {
        req.session.username = username
        SLog.info(req.ip + ' : new user signed in ' + username)
        res.redirect('/')
      }
      else SLog.err('Session is not defined')
    })
  }
}

export default SignUp
