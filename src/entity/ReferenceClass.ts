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

    constructor(params: ReferenceClassParameters) {
        super();
        
        this._name = params.name;

        this._schema = new ReferenceSchema({
            name: params.name,
            column: params.column,
            referenced_column: params.references.column,
            referenced_entity: params.references.inEntity,
            referenced_schema: params.references.inSchema,
            referenced_table: params.references.inTable
        });

    }
}

export interface ReferenceClassParameters {
    name: string;
    column: string;
    references: {
        column: string;
        inEntity?: string;
        inTable?: string;
        inSchema?: string;
    };
}