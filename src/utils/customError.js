class customError {
    constructor(httpStatusCode, msg) {
        this.httpStatusCode = httpStatusCode;
        this.msg = msg;
    }
}

export default customError;