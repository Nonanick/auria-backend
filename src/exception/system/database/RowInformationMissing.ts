import { AuriaException } from "auria-lib";

export class RowInformationMissing extends AuriaException {
    public getCode() {
        return "SYS.DATABASE.ROW_INFORMATION_MISSING";
    }
}