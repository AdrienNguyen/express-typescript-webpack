import dotenv from 'dotenv'
import fs from 'fs'

if (fs.existsSync('.env')) {
    dotenv.config({
        path: '.env',
    })
} else {
    dotenv.config({
        path: '.env.example',
    })
}

export const {
    NODE_ENV,
    PORT,
    DB_AUTHENTICATE,
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    JWT_KEY,
    EMAIL_ACCOUNT,
    EMAIL_PASSWORD,
} = process.env
