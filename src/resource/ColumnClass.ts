import { EventEmitter } from "events";
import { Bootable } from "../boot/Bootable.js";
import { ColumnSchema } from "../database/schema/sql/ColumnSchema.js";
import { IDataType } from "./standart/dataType/IDataType.js";
import { IGetProxy } from "./standart/getProxies/IGetProxy.js";
import { ISetProxy } from "./standart/setProxies/ISetProxy.js";
import { IDataValidator } from "./standart/validator/IDataValidator.js";
import { ProcedureCatalog } from "./standart/procedures/ProcedureCatalog.js";

export class ColumnClass extends EventEmitter implements Bootable {

    protected _name!: string;

    public get name(): string {
        return this._name;
    }

    protected _schema!: ColumnSchema;

    public get schema() {
        return this._schema;
    }

    protected _dataType!: IDataType;

    protected _getProxies: {
        [procedure: string]: IGetProxy[]
    } = {};

    protected _setProxies: {
        [procedure: string]: ISetProxy[]
    } = {};

    protected _validators: {
        [procedure: string]: IDataValidator[]
    } = {};

    constructor(params: ColumnClassParameters) {
        super();
        this._schema = params.schema;
        this._name = params.name ?? params.schema.get("name");
    }

    public getBootDependencies(): string[] {
        return [];
    }

    public getBootableName(): string {
        return `Resource()BootOfColumn()`;
    }

    public getBootFunction(): () => boolean | Promise<boolean> {
        return () => true;
    }

}

export interface ColumnClassParameters {
    name?: string;
    schema: ColumnSchema;
    dataType?: IDataType;
    setProxies?: {
        [procedure: string]: ISetProxy | ISetProxy[]
    };
    getProxies?: {
        [procedure: string]: IGetProxy | IGetProxy[]
    };
    validators?: IDataValidator | IDataValidator[];
}