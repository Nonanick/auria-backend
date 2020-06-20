import { AuriaException } from "auria-lib";
export class AuthenticationFailed extends AuriaException {
    getCode() {
        return "SYS.AUTHNETICATION.FAILED";
    }
}
//# sourceMappingURL=AuthenticationFailed.js.map