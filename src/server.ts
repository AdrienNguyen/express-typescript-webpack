import express from 'express'

import { NODE_ENV, PORT } from './config/secrets'
import ServerHandler from './handlers/server-handler'
class ExpressServer {
    app = express()

    constructor() {
        this.runApp().catch((err) => {
            console.trace('App shutdown due to a problem', err.message)
            process.exit(1)
        })
    }

    async runApp() {
        this.app.listen(PORT || 8080, () => {
            console.info(
                'App is running at http://localhost: %d in %s mode',
                PORT,
                NODE_ENV,
            )
            console.info('Press CTRL-C to stop')
        })

        new ServerHandler(this.app)
    }
}

new ExpressServer()
