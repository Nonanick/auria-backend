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

    constructor() {
        super();
    }
}