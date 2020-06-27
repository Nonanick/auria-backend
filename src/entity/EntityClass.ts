import Knex from "knex";
import { nanoid } from "nanoid";
import { EventEmitter } from "events";
import { Bootable } from "../boot/Bootable.js";
import { IDataFilterProvider } from "../database/query/IDataFilterProvider.js";
import { ColumnClass, ColumnClassParameters } from "./ColumnClass.js";
import { ColumnSchema } from "../database/schema/sql/ColumnSchema.js";
import { ProcedureCatalog } from "./standart/procedures/ProcedureCatalog.js";
import { ReferenceClass, ReferenceClassParameters } from "./ReferenceClass.js";
import { EntitySchema } from "../database/schema/sql/EntitySchema.js";
import { IEntityAccessRule } from "./standart/accessRules/IEntityAccessRule.js";
import { IEntityProcedure } from "./standart/procedures/IEntityProcedure.js";
import { IEntityFacade } from "./standart/facade/IResourceFacade.js";
import { IEntityInfo } from "./standart/info/IEntityInfo.js";
import { ConnectionDefinition } from "../database/connection/ConnectionDefinition.js";
import { ConnectionManager } from "../database/connection/ConnectionManager.js";
import { DefaultSchemaData } from "../database/schemaInterface/default/DefaultSchemaData.js";
import { AuriaRow } from "../database/schema/default/AuriaRow.js";

export abstract class EntityClass extends EventEmitter implements Bootable {

    protected _connection!: Knex;

    protected _connectionDefinition?: ConnectionDefinition;

    protected _name!: string;

    public get name(): string {
        return this._name;
    }

    protected _schema!: EntitySchema;

    public get schema(): EntitySchema {
        return this._schema;
    }

    protected _info: IEntityInfo;

    protected _columns: {
        [name: string]: ColumnClass
    } = {};


    public get columns() {
        return { ...this._columns };
    };

    protected _accessRules: {
        [name: string]: IEntityAccessRule
    } = {};

    protected _procedures: {
        [name: string]: IEntityProcedure
    } = {};

    protected _references: {
        [name: string]: ReferenceClass
    } = {};

    protected _facades: {
        [name: string]: IEntityFacade
    } = {};

    constructor(name: string) {
        super();

        this._schema = this.buildSchema();
        this._info = this.buildInfo();

        this._name = name;
    }

    protected buildDefaultIdColumn(): ColumnClass {
        return new ColumnClass({
            name: "ID",
            info: {
                title: "@{Auria.Defaults.IdColumn.Title}",
                description: "@{Auria.Defaults.IdColumn.Description}",
            },
            schema: new ColumnSchema({
                column_name: "_id",
                sql_type: "CHAR",
                length: 22,
                column_keys: ["PRI"],
                data_type: "IDColumn",
                nullable: false,
                readable: true,
                required: true,
            }),
            // Generate an nanoid everytime _id is requested and is null
            getProxies: (value) => {
                if (value == null)
                    return nanoid(22);
                return value;
            },
            hooks: {
                // Before INSERT make sure _id is not null!
                [ProcedureCatalog.CREATE]: (context) => {
                    if (context.procedureData._id == null)
                        context.procedureData._id = nanoid(22);
                }
            },

        });
    }


    protected buildDefaultStatusColumn(): ColumnClass {
        return new ColumnClass({
            name: "Status",
            info: {
                title: "@{Auria.Defaults.StatusColumn.Title}",
                description: "@{Auria.Defaults.StatusColumn.Description}",
            },
            schema: new ColumnSchema({
                column_name: "status",
                sql_type: "VARCHAR",
                nullable: false,
                default_value: "active",
                readable: false,
                required: true,
            }),
            validators: (value) => {
                const validStatus = ["active", "inactive"];
                return validStatus.includes(value) ? true : "'Status' column only accepts " + validStatus.join(" , ");
            }
        });
    }

    public addColumns(...columns: (ColumnClass | ColumnClassParameters)[]) {

        if (Array.isArray(columns)) {
            for (let column of columns) {
                let obj: ColumnClass; //TS complaining...
                if (!(column instanceof ColumnClass)) {
                    obj = new ColumnClass(column);
                } else {
                    obj = column;
                }

                this._columns[obj.name] = obj;
                this._schema.addColumns(obj.schema);
            }
        }
    }

    public addProcedures(...procedures: IEntityProcedure[]) {
        if (Array.isArray(procedures)) {
            for (let procedure of procedures) {
                this._procedures[procedure.name] = procedure;
            }
        }
    }

    public removeProcedure(name: string) {
        if (this._procedures[name] != null) {
            delete this._procedures[name];
        } else {
            console.warn("WARN! Entity ", this.name, " does not possess procedure ", name, " ignoring remove request!");
        }
    }

    public hasProcedure(name: string) {
        return this._procedures[name] != null;
    }

    public addReferences(...references: (ReferenceClass | ReferenceClassParameters)[]) {

        if (Array.isArray(references)) {

            for (let reference of references) {
                if (reference instanceof ReferenceClass) {
                    this._references[reference.name] = reference;
                    this._schema.addReferences(reference.schema);
                } else {
                    const refClass = new ReferenceClass(reference);
                    this._references[reference.name] = refClass;
                }
            }
        }

    }

    public addAccessRules(...rules: IEntityAccessRule[]) {
        if (Array.isArray(rules)) {
            for (let rule of rules) {
                this._accessRules[rule.name] = rule;
            }
        }
    }

    public addFacades(...facades : IEntityFacade[]) {
        if(Array.isArray(facades)) {
            for(let facade of facades) {
                this._facades[facade.name] = facade;
            }
        }
    }

    public getFilterProviderForProcedure(procedure: string): IDataFilterProvider {
        return {
            applyFilter: async (query, context) => {
                return query;
            }
        }
    }

    public setConnection(connection: Knex | ConnectionDefinition) {

        if (connection instanceof Knex) {
            this._connection = connection as Knex;
            delete this._connectionDefinition;
        } else {
            this._connection = ConnectionManager.fromDefinition(connection as ConnectionDefinition);
            this._connectionDefinition = connection as ConnectionDefinition;
        }

    }

    public row<T extends DefaultSchemaData>() : AuriaRow<T> {
        let row = new AuriaRow<T>(this);
        return row;
    }
  
    public getBootableName(): string {
        return `BootOfEntity(${this.schema.get("name")})`;
    }

    public abstract getBootDependencies(): string[];

    public abstract getBootFunction(): () => boolean | Promise<boolean>;

    protected abstract buildSchema(): EntitySchema;

    protected abstract buildInfo(): IEntityInfo;
}