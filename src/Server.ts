import * as express from 'express'
import * as SLog from './SLog'

class Server {
  app: express.Application
  router: express.Router

  constructor() {
    this.app = express()
    this.router = express.Router()

    this.setup()
  }

  setup() {
    this.app.set('port', 80)

    this.router.route('/').get((req: express.Request, res: express.Response) => {
      SLog.info(req.ip + ' : portal')
      res.end('<h1>Hello World</h1>')
    })
    this.app.use(express.static(__dirname + '/public'))
    this.app.use(this.router)
  }

  start() {
    this.app.listen(this.app.get('port'), () => {
      SLog.success(`Express server is online on port ${this.app.get('port')}`)
    })
  }
}

export default Server
