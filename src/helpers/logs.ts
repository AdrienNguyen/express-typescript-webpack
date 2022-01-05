import { format, createLogger, transports, Logger } from 'winston'

const { splat, printf, combine, label, timestamp } = format

import { appLog } from '../../config/paths'

const Log = async (title: string): Promise<Logger> => {
    let options = {
        format: combine(
            splat(),
            timestamp({
                format: 'YYYY-MM-DD HH:mm:ss',
            }),
            label({
                label: title,
            }),
            printf((log) => {
                return `${log.timestamp} | ${log.label} | ${log.level} | ${log.message}`
            }),
        ),
        transports: [
            new transports.File({
                filename: appLog + `/info.log`,
                level: 'info',
            }),
            new transports.File({
                filename: appLog + `/error.log`,
                level: 'error',
            }),
        ],
    }

    return createLogger(options)
}

export const LogInfo = async (
    email: string,
    content: string,
): Promise<void> => {
    try {
        const Logger = await Log(content)
        Logger.info(email)
    } catch (error) {
        console.trace(error.message)
    }
}

export const LogError = async (
    email: string,
    content: string,
): Promise<void> => {
    try {
        const Logger = await Log(content)
        Logger.error(email)
    } catch (error) {
        console.trace(error.message)
    }
}
