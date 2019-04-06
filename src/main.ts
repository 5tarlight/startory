import * as express from 'express'

const app: express.Application = express()
const router: express.Router = express.Router()

app.set('port', 80)

router.route('/').get((req: express.Request, res: express.Response) => {
  console.log(req.ip + ' : portal')
  res.end('<h1>Hello World</h1>')
})

app.use(router)

app.listen(app.get('port'), () => {
  console.log(`Express server is online on port ${app.get('port')}`)
})