export class SystemResponse {
    constructor(message) {
        this.errors = [];
        this.httpStatus = 200;
        this.headers = {};
        this.cookies = {};
        this.message = message;
        this._exitCode = "SYS.REQUEST.DONE";
    }
    get exitCode() {
        return this._exitCode;
    }
    setExitCode(code) {
        this._exitCode = code;
    }
}
//# sourceMappingURL=SystemResponse.js.map