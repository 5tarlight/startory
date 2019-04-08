import * as express from 'express'
import * as SLog from '../SLog'

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
}

export default SignUp
