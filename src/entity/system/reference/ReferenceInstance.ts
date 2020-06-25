import { EntityClass } from "../../EntityClass.js";
import { ReferenceSchema } from "../../../database/schema/sql/ReferenceSchema.js";

export class ReferenceInstance extends EntityClass {

    public getBootDependencies(): string[] {
        throw new Error("Method not implemented.");
    }

    public getBootFunction(): () => boolean | Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    
    protected buildSchema() {
        return new ReferenceSchema();
    }


}