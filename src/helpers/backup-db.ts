// using node-schedule to set up job backup database every week

import {
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    DB_AUTHENTICATE,
} from '../config/secrets'
import { getLocalDateTimeString } from './times'
import { appBackup } from '../../config/paths'
import fs from 'fs'
import { exec } from 'child_process'

export const backupDB = (): void => {
    try {
        const version: string = getLocalDateTimeString()

        const createBackupFolder = (): string => {
            const path: string = appBackup + '/' + version
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path, {
                    recursive: true,
                })
            }
            return path
        }

        const backupFolder: string = createBackupFolder()
        const backupDescription: string = `Backup database ${DB_NAME} at ${version}`

        // 1. create version.txt in folderback up
        fs.appendFile(
            backupFolder + `/README.txt`,
            backupDescription,
            (err) => {
                if (err) throw err
            },
        )
        // 2. backup database
        const commandBackup =
            DB_AUTHENTICATE === 'true'
                ? `mongodump --host="${DB_HOST}" --port="${DB_PORT}" --db="${DB_NAME}" --username="${DB_USERNAME}" --password="${DB_PASSWORD}" --out="${backupFolder}"`
                : `mongodump --host="${DB_HOST}" --port="${DB_PORT}" --db="${DB_NAME}" --out="${backupFolder}"`
        exec(commandBackup, (err) => {
            if (err) throw err
        })
    } catch (error) {
        console.log(error.message)
    }
}
