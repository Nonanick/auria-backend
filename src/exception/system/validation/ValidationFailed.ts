import { AuriaException } from "auria-lib";

export class ValidationFailed extends AuriaException {
    getCode() {
        return "SYS.VALIDATION.VALIDATION_FAILED";
    }
}