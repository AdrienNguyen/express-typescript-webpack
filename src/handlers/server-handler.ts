import { Express } from 'express'
import apiRouter from '../routes/api'
import authRouter from '../modules/auth/auth.route'

export default class ServerHandler {
    app: Express

    constructor(app: Express) {
        this.app = app
        this.initRouting()
    }

    initRouting() {
        this.app.use('/', apiRouter)
        this.app.use('/api/user', authRouter)
    }
}
