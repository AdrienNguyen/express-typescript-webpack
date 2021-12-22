import * as dotenv from 'dotenv'
import * as fs from 'fs'

if (fs.existsSync('.env')) {
    dotenv.config({
        path: '.env',
    })
} else {
    dotenv.config({
        path: '.env.example',
    })
}

export const { NODE_ENV, PORT } = process.env
