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

    protected _info: ColumnInfo;

    public get info(): ColumnInfo {
        return this._info;
    }

    protected _schema!: ColumnSchema;

    public get schema() {
        return this._schema;
    }

    protected _dataType!: IDataType;

    public get dataType() {
        return { ...this._dataType };
    }

    protected _getProxies: IGetProxy[] = [];

    public get getProxies() {
        return [...this._getProxies];
    }

    protected _setProxies: ISetProxy[] = [];

    public get setProxies() {
        return [...this._setProxies];
    }

    protected _validators: IDataValidator[] = [];

    public get validators() {
        return { ...this._validators };
    }

    protected _hooks: {
        [procedure: string]: IEntityProcedureHook[]
    } = {};

    public get hooks() {
        return { ...this._hooks };
    }

    constructor(params: ColumnClassParameters) {
        super();

        if (params.schema instanceof ColumnSchema)
            this._schema = params.schema;
        else
            this._schema = new ColumnSchema(params.schema);

        this._name = params.name;

        this._info = {
            name: params.name,
            title: params.info?.title ?? "",
            description: params.info?.description ?? ""
        };

        // Normalize GET Proxies
        if (params.getProxies) {
            if (Array.isArray(params.getProxies)) {
                this._getProxies = params.getProxies;
            } else {
                this._getProxies = [params.getProxies!];
            }
        }

        // Normalize SET Proxies
        if (params.setProxies) {
            if (Array.isArray(params.setProxies)) {
                this._setProxies = params.setProxies;
            } else {
                this._setProxies = [params.setProxies];
            }
        }

        // Normalize Validators
        if (params.validators) {
            if (Array.isArray(params.validators)) {
                this._validators = params.validators;
            } else {
                this._validators = [params.validators];
            }
        }

        // Normalizae Hooks
        if (params.hooks) {
            for (let procedure in params.hooks) {
                let hook = params.hooks[procedure];
                if (Array.isArray(hook)) {
                    this._hooks[procedure] = hook;
                } else {
                    this._hooks[procedure] = [hook];
                }
            }
        }


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

    public hasKey(key: "PRI" | "UNI" | "IND") {
        return this.schema.get("column_keys").includes(key);
    }

}

export interface ColumnClassParameters {
    name: string;
    info?: {
        title?: string;
        description?: string;
    };
    schema: ColumnSchema | Partial<IColumn> & Required<Pick<IColumn, RequiredColumnParameters>>;
    dataType?: IDataType;
    getProxies?: IGetProxy | IGetProxy[];
    setProxies?: ISetProxy | ISetProxy[];
    validators?: IDataValidator | IDataValidator[];
    hooks?: {
        [procedure: string]: IEntityProcedureHook | IEntityProcedureHook[]
    };
}

export interface ColumnInfo {
    name: string;
    title?: string;
    description?: string;
}

type RequiredColumnParameters = "column_name" | "sql_type";