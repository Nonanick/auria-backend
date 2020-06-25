import { EventEmitter } from "events";
import { ReferenceSchema } from "../database/schema/sql/ReferenceSchema.js";

export class ReferenceClass extends EventEmitter {


    protected _name!: string;
    public get name() {
        return this._name;
    }

    protected _schema !: ReferenceSchema;
    public get schema() {
        return this._schema;
    }

    constructor(params : ReferenceClassParameters) {
        super();
        this._schema = params.schema;
    }
}

export interface ReferenceClassParameters {
    schema : ReferenceSchema;
}

export interface IEntityReference {
    name : string;
    column: string;
    referencedColumn : string;
    referencedTable : string;
}