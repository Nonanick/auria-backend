import Knex from "knex";
import { Bootable } from "../boot/Bootable.js";
import { EventEmitter } from "events";
import { IDataFilterProvider } from "../database/query/IDataFilterProvider.js";
import { ColumnClass, ColumnClassParameters } from "./ColumnClass.js";
import { ColumnSchema } from "../database/schema/sql/ColumnSchema.js";
import { nanoid } from "nanoid";
import { ProcedureCatalog } from "./standart/procedures/ProcedureCatalog.js";
import { ReferenceClass } from "./ReferenceClass.js";
import { EntitySchema } from "../database/schema/sql/EntitySchema.js";
import { IEntityAccessRule } from "./standart/accessRules/IEntityAccessRule.js";
import { IEntityProcedure } from "./standart/procedures/IEntityProcedure.js";
import { IEntityFacade } from "./standart/facade/IResourceFacade.js";
import { IEntityInfo } from "./standart/info/IEntityInfo.js";
import { IEntity } from "../database/schemaInterface/IEntity.js";
import { ConnectionDefinition } from "../database/connection/ConnectionDefinition.js";

export abstract class EntityClass extends EventEmitter implements Bootable {

    protected _connection!: Knex;

    protected _connectionDefinition! : ConnectionDefinition;

    protected _name!: string;

    public get name(): string {
        return this._name;
    }

    protected _schema!: EntitySchema;

    public get schema(): EntitySchema {
        return this._schema;
    }

    protected _info : IEntityInfo;

    protected _columns: {
        [name: string]: ColumnClass
    } = {};

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

    constructor() {
        super();
        this._schema = this.buildSchema();
        this._info = this.buildInfo();
    }

    protected buildDefaultIdColumn(): ColumnClass {
        return new ColumnClass({
            name: "ID",
            schema: new ColumnSchema({
                name: "ID",
                column_name: "_id",
                sql_type: "CHAR",
                length: 22,
                column_keys: ["PRI"],
                data_type: "IDColumn",
                title: "@{Auria.Defaults.IdColumn.Title}",
                description: "@{Auria.Defaults.IdColumn.Description}",
                nullable: false,
                readable: true,
                required: true,
                status: "active"
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
            schema: new ColumnSchema({
                name: "Status",
                column_name: "status",
                sql_type: "VARCHAR",
                title: "@{Auria.Defaults.StatusColumn.Title}",
                description: "@{Auria.Defaults.StatusColumn.Description}",
                nullable: false,
                default_value: "active",
                readable: false,
                required: true,
                status: "active"
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

                this._columns[obj.schema.get("name")] = obj;
                this._schema.addColumns(obj.schema);
            }
        }
    }

    public addReferences(...references: ReferenceClass[]) {

        if (Array.isArray(references)) {

            for (let reference of references) {

                this._references[reference.name] = reference;
                this._schema.addReferences(reference.schema);
            }
        }

    }

    public addAccessRule(...rules: IEntityAccessRule[]) {
        if (Array.isArray(rules)) {
            for (let rule of rules) {
                this._accessRules[rule.name] = rule;
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

    public setConnection(connection : Knex | ConnectionDefinition) {

        if(connection instanceof Knex) {
            this._connection = connection as Knex;
            delete this._connectionDefinition;
        } else {
            this._connection = ConnectionManager.fromDefinition(connection);
            this._connectionDefinition = connection as ConnectionDefinition;
        }

    }

    public abstract getBootDependencies(): string[];
    
    public getBootableName(): string {
        return `BootOfEntity(${this.schema.get("name")})`;
    }

    public abstract getBootFunction(): () => boolean | Promise<boolean>;

    protected abstract buildSchema(): EntitySchema;

    protected abstract buildInfo() : IEntityInfo;
}