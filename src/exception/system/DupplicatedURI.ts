import { AuriaException } from "auria-lib";

export class DupplicatedURI extends AuriaException {
    public getCode(): string {
        return "SYS.API.DUPPLICATED_URI";
    }

}