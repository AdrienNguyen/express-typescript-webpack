import MongoDb from './mongodb'
import MySQL from './mysql'

export default class ConnectionFactory {
    constructor() {}

    public static getConnection(connectionType: DBType): Connection {
        switch (connectionType) {
            case DBType.MongoDb:
                return new MongoDb()
            case DBType.MySQL:
                return new MySQL()
            default:
                throw new Error(
                    'Get database connection failed. Please try again!',
                )
        }
    }
}
