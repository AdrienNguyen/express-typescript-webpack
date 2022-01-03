class HttpError extends Error {
    code: string
    constructor(message, errorCode) {
        super(message)
        this.code = errorCode
    }
}

export default HttpError
