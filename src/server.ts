import express from 'express'
import bodyParser from 'body-parser'

import { NODE_ENV, PORT } from './config/secrets'
import MongoDbConnection from './connection'
import authRouter from './modules/auth/auth.route'
class ExpressServer {
    app = express()
    mongodbConnection: MongoDbConnection

    async runApp() {
        this.app.listen(PORT || 8080, () => {
            console.info(
                'Server is running at http://localhost: %d in %s mode',
                PORT,
                NODE_ENV,
            )
            console.info('Press CTRL-C to stop')
        })

        this.initDatebase()
        this.initMiddleware()
        this.initRouter()
    }

    initDatebase() {
        this.mongodbConnection = new MongoDbConnection()
        this.mongodbConnection.connect()
    }

    initMiddleware() {
        this.app.use(bodyParser.json())
    }

    initRouter() {
        this.app.use('/api/user', authRouter)
        this.app.use('/', (req, res) => {
            res.send('<h1>Welcome to express server with typescript</h1>')
        })
    }
}

const expressServer = new ExpressServer()

expressServer.runApp().catch((err) => {
    console.trace('App shutdown due to a problem', err.message)
    process.exit(1)
})
