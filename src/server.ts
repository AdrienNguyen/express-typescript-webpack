import express from 'express'

import { NODE_ENV, PORT } from './config/secrets'
import MongoDbConnection from './connection'
import ServerHandler from './handlers/server-handler'
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

        new ServerHandler(this.app)
        this.initDatebase()
    }

    initDatebase() {
        this.mongodbConnection = new MongoDbConnection()
        this.mongodbConnection.connect()
    }
}

const expressServer = new ExpressServer()

expressServer.runApp().catch((err) => {
    console.trace('App shutdown due to a problem', err.message)
    process.exit(1)
})
