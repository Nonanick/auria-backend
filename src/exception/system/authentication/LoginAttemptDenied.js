import { AuriaException } from "auria-lib";
export class LoginAttemptDenied extends AuriaException {
    getCode() {
        return "SYS.AUTH.LOGIN_ATTEMPT_DENIED";
    }
    constructor(message, options) {
        super(message);
    }
}
//# sourceMappingURL=LoginAttemptDenied.js.map