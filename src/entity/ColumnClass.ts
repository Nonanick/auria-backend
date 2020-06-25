import { EventEmitter } from "events";
import { Bootable } from "../boot/Bootable.js";
import { ColumnSchema } from "../database/schema/sql/ColumnSchema.js";
import { IDataType } from "./standart/dataType/IDataType.js";
import { IGetProxy } from "./standart/getProxies/IGetProxy.js";
import { ISetProxy } from "./standart/setProxies/ISetProxy.js";
import { IDataValidator } from "./standart/validator/IDataValidator.js";
import { IEntityProcedureHook } from "./standart/procedures/IEntityProcedureHook.js";
import { IColumn } from "../database/schemaInterface/IColumn.js";

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

    protected _getProxies: IGetProxy[] = [];

    protected _setProxies: ISetProxy[] = [];

    protected _validators: {
        [procedure: string]: IDataValidator[]
    } = {};

    protected _hooks: {
        [procedure: string]: IEntityProcedureHook[]
    } = {};

    constructor(params: ColumnClassParameters) {
        super();

        if (params.schema instanceof ColumnSchema)
            this._schema = params.schema;
        else
            this._schema = new ColumnSchema(params.schema);

        this._name = params.name ?? this._schema.get("name");
    }

    public getBootDependencies(): string[] {
        return [];
    }

    public getBootableName(): string {
        return `Entity()BootOfColumn()`;
    }

    public getBootFunction(): () => boolean | Promise<boolean> {
        return () => true;
    }

}

export interface ColumnClassParameters {
    name?: string;
    schema: ColumnSchema | Partial<IColumn> & Required<Pick<IColumn, RequiredColumnParameters>>;
    dataType?: IDataType;
    getProxies?: IGetProxy | IGetProxy[];
    setProxies?: ISetProxy | ISetProxy[];
    validators?: IDataValidator | IDataValidator[];
    hooks?: {
        [procedure: string]: IEntityProcedureHook | IEntityProcedureHook[]
    };
}

type RequiredColumnParameters = "column_name" | "name" | "sql_type";