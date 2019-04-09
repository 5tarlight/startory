import * as express from 'express'
import * as SLog from './SLog'
import * as path from 'path'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import * as expressSession from 'express-session'
import DB from './DB'
import Router from './routes/Router'

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
    this.app.set('view engine', 'pug')
    this.app.set('views', path.join(__dirname, '/public/views'))

    this.app.use('/', express.static(path.join(__dirname, '/public')))
    this.app.use(bodyParser.urlencoded({ extended: false }))
    this.app.use(bodyParser.json())
    this.app.use(cookieParser())
    this.app.use(expressSession({
      secret: '!@#%#^$%&^*&#$@!$^',
      resave: true,
      saveUninitialized: true
    }))

    DB.init()
    Router.init(this.app, this.router)
  }

  start() {
    this.app.listen(this.app.get('port'), () => {
      SLog.success(`Express server is online on port ${this.app.get('port')}`)
    })
  }
}

export default Server
