import { Express } from 'express'
import apiRouter from '../routes/api'

export default class ServerHandler {
    app: Express

    constructor(app: Express) {
        this.app = app
        this.initRouting()
    }

    initRouting() {
        this.app.use('/', apiRouter)
    }
}
