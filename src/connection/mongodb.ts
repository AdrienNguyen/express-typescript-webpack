import mongoose from 'mongoose'
import {
    DB_AUTHENTICATE,
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
} from '../config/secrets'

export default class MongoDb implements Connection {
    uri: string
    connectOptions: object

    constructor() {
        this.uri = `mongodb://${DB_HOST}:${DB_PORT || '27017'}/${DB_NAME}`
        this.connectOptions =
            DB_AUTHENTICATE === 'true'
                ? {
                      useNewUrlParser: true,
                      useUnifiedTopology: true,
                      user: DB_USERNAME,
                      pass: DB_PASSWORD,
                  }
                : {
                      useNewUrlParser: true,
                      useUnifiedTopology: true,
                  }
    }

    async connect() {
        mongoose
            .connect(this.uri, this.connectOptions)
            .then(() => {
                console.log('Connect Database MongoDb successfully')
            })
            .catch((error) => {
                console.log(error.message)
            })
    }
}
