import { ResourceClass } from "../../Resource.js";
import { ResourceSchema } from "../../../database/schema/sql/ResourceSchema.js";
import { Column } from "../../../database/schema/Column.js";

export class ColumnInstance extends ResourceClass {

    public getBootDependencies(): string[] {
        throw new Error("Method not implemented.");
    }
    public getBootableName(): string {
        throw new Error("Method not implemented.");
    }
    public getBootFunction(): () => boolean | Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    protected buildSchema(): ResourceSchema {
        return new Column();
    }

}