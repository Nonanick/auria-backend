import { AuriaException } from "auria-lib";
export class UserAccessNotAuthorized extends AuriaException {
    getCode() {
        return "SYS.SECURITY.USER_ACCESS_NOT_AUTHORIZED";
    }
}
//# sourceMappingURL=UserAccessNotAuthorized.js.map