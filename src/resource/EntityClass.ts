import Knex from "knex";
import { Bootable } from "../boot/Bootable.js";
import { EventEmitter } from "events";
import { ResourceSchema } from "../database/schema/sql/ResourceSchema.js";
import { IResourceFacade } from "./standart/facade/IResourceFacade.js";
import { IResourceProcedure } from "./standart/procedures/IResourceProcedure.js";
import { IResourceAccessRule } from "./standart/accessRules/IResourceAccessRule.js";
import { IDataFilterProvider } from "../database/query/IDataFilterProvider.js";
import { ColumnClass, ColumnClassParameters } from "./ColumnClass.js";
import { ColumnSchema } from "../database/schema/sql/ColumnSchema.js";
import { nanoid } from "nanoid";
import { ProcedureCatalog } from "./standart/procedures/ProcedureCatalog.js";
import { ReferenceClass } from "./ReferenceClass.js";

export abstract class ResourceClass extends EventEmitter implements Bootable {

    protected _connection!: Knex;

    protected _name!: string;

    public get name(): string {
        return this._name;
    }

    protected _schema!: ResourceSchema;

    public get schema(): ResourceSchema {
        return this._schema;
    }

    protected _columns: {
        [name: string]: ColumnClass
    } = {};

    protected _accessRules: {
        [name: string]: IResourceAccessRule
    } = {};

    protected _procedures: {
        [name: string]: IResourceProcedure
    } = {};

    protected _references: {
        [name: string]: ReferenceClass
    } = {};

    protected _facades: {
        [name: string]: IResourceFacade
    } = {};

    constructor() {
        super();
        this._schema = this.buildSchema();
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

    public addAccessRule(...rules: IResourceAccessRule[]) {
        if (Array.isArray(rules)) {
            for (let rule of rules) {
                this._accessRules[rule.name] = rule;
            }
        }
    }

    public addProcedures(...procedures: IResourceProcedure[]) {
        if (Array.isArray(procedures)) {
            for (let procedure of procedures) {
                this._procedures[procedure.name] = procedure;
            }
        }
    }

    public addFacades(...facades : IResourceFacade[]) {
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

    public abstract getBootDependencies(): string[];

    public getBootableName(): string {
        return `BootOfResource(${this.schema.get("name")})`;
    }

    public abstract getBootFunction(): () => boolean | Promise<boolean>;

    protected abstract buildSchema(): ResourceSchema;
}