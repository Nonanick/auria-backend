import { AuriaException } from "auria-lib";

export class LoginAttemptDenied extends AuriaException {
    getCode() {
        return "SYS.AUTH.LOGIN_ATTEMPT_DENIED";
    }

    constructor(message : string, options? : {
        cooldown ?: number;
    }) {
        super(message);
    }

}