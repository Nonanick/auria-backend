import { AuriaException } from "auria-lib";

export class AuthenticationFailed extends AuriaException {

    public getCode(): string {
        return "SYS.AUTHNETICATION.FAILED";
    }

}