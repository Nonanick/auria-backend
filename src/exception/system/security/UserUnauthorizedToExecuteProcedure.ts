import { AuriaException } from "auria-lib";

export class UserUnauthorizedToExecuteProcedure extends AuriaException {
    getCode() {
        return "SYS.AUTHORIZATION.USER_UNAUTHORIZED_TO_EXECUTE_PROCEDURE";
    }
}