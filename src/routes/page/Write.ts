import { Request, Response } from 'express'
import * as SLog from '../../SLog'
import DB from '../..//DB';

class Write {
  static join(req: Request, res: Response): void {
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

  static write(req: Request, res: Response): void {
    const title = req.body.title || req.query.title
    const desc = req.body.desc || req.query.desc
    const markdown = req.body.markdown || req.query.markdown
    const tag = req.body.tag || req.query.tag
    /**
    * @todo tag, desc 값도 사용하기
    * @body SQL 수정, DBPage.ts 수정 필요
    */
    
    if(!req.session) {
      res.redirect('/login')
      return
    }

    DB.query('SELECT * FROM `user` WHERE username=?', [req.session.username], (err, results, fields) => {
      if(err) {
        SLog.err(err.stack || err.toString())
        return
      }

      const author = results[0]['username']
    
      if(!title || !markdown) {
        res.redirect('/write')
        return
      }
    
      DB.query('INSERT INTO topic (`title`, `article`, `author`) VALUES (?, ?, ?)', [title, markdown, author], (err, results, fields) => {
        if(err) {
          SLog.err(err.stack || err.toString())
          return
        }

        res.redirect('/')
      })
    })
  }
}

export default Write
