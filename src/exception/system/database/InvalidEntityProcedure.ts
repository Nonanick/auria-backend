import { AuriaException } from "auria-lib";

export class InvalidEntityProcedure extends AuriaException {

    public getCode() {
        return "SYS.DATABASE.INVALID_ENTITY_PROCEDURE";
    }
}