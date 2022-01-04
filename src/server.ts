/* eslint-disable @typescript-eslint/no-unused-vars */

import express from 'express'
import bodyParser from 'body-parser'
import fs from 'fs'

import { NODE_ENV, PORT } from './config/secrets'
import ConnectionFactory from './connection/connection-factory'
import authRouter from './modules/auth/auth.route'
import { HttpError } from './models'
class ExpressServer {
    app = express()

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
        this.handleError()
    }

    initDatebase() {
        const connection: Connection = ConnectionFactory.getConnection(
            DBType.MongoDb,
        )
        connection.connect()
    }

    initMiddleware() {
        // handle body parser
        this.app.use(bodyParser.json())
        // handle cors error
        this.app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.setHeader(
                'Access-Control-Allow-Headers',
                'Origin, X-Requested-With, Content-Type, Accept, Authorization',
            )
            res.setHeader(
                'Access-Control-Allow-Methods',
                'GET, POST, PATCH, DELETE',
            )
            next()
        })
    }

    initRouter() {
        this.app.use('/api/user', authRouter)
        this.app.get('/', (req, res) => {
            res.send('<h1>Welcome to express server with typescript</h1>')
        })
    }

    handleError() {
        // handle route not found
        this.app.use((req, res, next) => {
            throw new HttpError('Could not find this route', 404)
        })
        // handle error
        this.app.use((error, req, res, next) => {
            if (req.file) {
                fs.unlink(req.file.path, (err) => {
                    console.log(err)
                })
            }
            if (res.headerSent) {
                return next(error)
            }

            res.status(error.code || 500).json({
                success: false,
                message: res.message || '',
                content: error.message || 'An unknow error occurred!',
            })
        })
    }
}

const expressServer = new ExpressServer()

expressServer.runApp().catch((err) => {
    console.trace('App shutdown due to a problem', err.message)
    process.exit(1)
})
